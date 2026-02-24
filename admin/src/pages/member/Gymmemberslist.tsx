import React, {
  useState,
  useMemo,
  useCallback,
  useEffect,
  memo,
 
} from "react";
import {
  Box,
  Typography,
  InputBase,
  Button,
  IconButton,
  Chip,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Skeleton,
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  Stack,
  MenuItem,
  Select,
  FormControl,
  Tooltip,
  Badge,
  alpha,
  createTheme,
  ThemeProvider,
  TablePagination,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";

// ─── Types ─────────────────────────────────────────────────────────────────────
export type MemberStatus = "fees_paid" | "fees_due";
export type MemberGroup = "Basic Members" | "Premium Members" | "Elite Members";
export type MemberGender = "Male" | "Female";
export type ModalMode = "view" | "edit";

export interface Member {
  id: number;
  name: string;
  date: string;
  group: MemberGroup;
  goal: string;
  status: MemberStatus;
  gender: MemberGender;
}

export interface MemberFilters {
  group: MemberGroup | "";
  mode: MemberStatus | "";
  gender: MemberGender | "";
}

export interface ModalState {
  open: boolean;
  member: Member | null;
  mode: ModalMode;
}

// ─── MUI Theme ─────────────────────────────────────────────────────────────────
const gymTheme = createTheme({
  palette: {
    primary: { main: "#7C3AED" },
    background: { default: "#ffffff00", paper: "#ffffff" },
  },
  typography: {
    fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif",
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: { borderBottom: "1px solid #F1F5F9", fontFamily: "inherit" },
        head: {
          backgroundColor: "#F8FAFC",
          fontWeight: 700,
          fontSize: 13,
          color: "#111827",
          borderBottom: "1px solid #E5E7EB",
          letterSpacing: "0.01em",
          padding: "13px 16px",
        },
        body: { padding: "14px 16px", fontSize: 14, color: "#374151" },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          transition: "background-color 0.15s",
          "&:hover": { backgroundColor: "#FAFAFA" },
          "&.Mui-selected": { backgroundColor: "#F5F3FF !important" },
          "&.Mui-selected:hover": { backgroundColor: "#EDE9FE !important" },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: "1px solid #E5E7EB",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        },
      },
    },
    MuiChip: {
      styleOverrides: { root: { fontWeight: 600, fontSize: 12 } },
    },
    MuiSelect: {
      styleOverrides: {
        root: { fontFamily: "inherit" },
      },
    },
  },
});

// ─── Constants ─────────────────────────────────────────────────────────────────
const MOCK_MEMBERS: Member[] = [
  { id: 1,  name: "Kalai Selvan",   date: "06/10/2026", group: "Basic Members",   goal: "Weight Loss",  status: "fees_paid", gender: "Male"   },
  { id: 2,  name: "Arjun Raj",      date: "05/22/2026", group: "Premium Members", goal: "Muscle Gain",  status: "fees_due",  gender: "Male"   },
  { id: 3,  name: "Priya Nair",     date: "04/15/2026", group: "Basic Members",   goal: "Cardio",       status: "fees_paid", gender: "Female" },
  { id: 4,  name: "Ravi Kumar",     date: "07/01/2026", group: "Elite Members",   goal: "Weight Loss",  status: "fees_paid", gender: "Male"   },
  { id: 5,  name: "Meena Devi",     date: "03/30/2026", group: "Basic Members",   goal: "Flexibility",  status: "fees_due",  gender: "Female" },
  { id: 6,  name: "Suresh Babu",    date: "08/12/2026", group: "Premium Members", goal: "Muscle Gain",  status: "fees_paid", gender: "Male"   },
  { id: 7,  name: "Lakshmi G",      date: "06/18/2026", group: "Basic Members",   goal: "Weight Loss",  status: "fees_paid", gender: "Female" },
  { id: 8,  name: "Vijay Anand",    date: "02/25/2026", group: "Elite Members",   goal: "Endurance",    status: "fees_due",  gender: "Male"   },
  { id: 9,  name: "Deepa Krishnan", date: "09/05/2026", group: "Premium Members", goal: "Cardio",       status: "fees_paid", gender: "Female" },
  { id: 10, name: "Karthik S",      date: "01/14/2026", group: "Basic Members",   goal: "Weight Loss",  status: "fees_paid", gender: "Male"   },
];

const GROUPS: MemberGroup[] = ["Basic Members", "Premium Members", "Elite Members"];
const GENDERS: MemberGender[] = ["Male", "Female"];
const TABLE_COLUMNS = ["Name", "Date", "Group", "Goal", "Status", "Action"] as const;

// ─── Sub-components ────────────────────────────────────────────────────────────

/** Shimmer skeleton for a single table row */
const SkeletonRow = memo(() => (
  <TableRow>
    <TableCell padding="checkbox">
      <Skeleton variant="rectangular" width={18} height={18} sx={{ borderRadius: 0.5 }} />
    </TableCell>
    <TableCell><Skeleton variant="text" width="65%" height={20} /></TableCell>
    <TableCell><Skeleton variant="text" width="55%" height={20} /></TableCell>
    <TableCell><Skeleton variant="rounded" width={110} height={28} sx={{ borderRadius: 20 }} /></TableCell>
    <TableCell><Skeleton variant="text" width="50%" height={20} /></TableCell>
    <TableCell><Skeleton variant="rounded" width={92} height={30} sx={{ borderRadius: 20 }} /></TableCell>
    <TableCell align="center">
      <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
        <Skeleton variant="circular" width={34} height={34} />
        <Skeleton variant="circular" width={34} height={34} />
      </Box>
    </TableCell>
  </TableRow>
));
SkeletonRow.displayName = "SkeletonRow";

/** Green / Red status chip */
interface StatusChipProps { status: MemberStatus }
const StatusChip = memo(({ status }: StatusChipProps) => (
  <Chip
    label={status === "fees_paid" ? "Fees Paid" : "Fees Due"}
    size="small"
    sx={{
      bgcolor: status === "fees_paid" ? "#16A34A" : "#EF4444",
      color: "#fff",
      fontWeight: 700,
      fontSize: 12,
      height: 30,
      px: 0.5,
    }}
  />
));
StatusChip.displayName = "StatusChip";

/** Yellow group chip */
interface GroupChipProps { group: MemberGroup }
const GroupChip = memo(({ group }: GroupChipProps) => (
  <Chip
    label={group}
    size="small"
    sx={{
      bgcolor: "#FEF9C3",
      color: "#CA8A04",
      border: "1px solid #FDE68A",
      fontWeight: 600,
      fontSize: 12,
      height: 28,
    }}
  />
));
GroupChip.displayName = "GroupChip";

/** Reusable filter <Select> */
interface FilterSelectProps {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (val: string) => void;
  icon?: React.ReactNode;
}
const FilterSelect = memo(({ label, value, options, onChange, icon }: FilterSelectProps) => (
  <FormControl size="small">
    <Select
      displayEmpty
      value={value}
      onChange={(e: SelectChangeEvent<string>) => onChange(e.target.value)}
      IconComponent={KeyboardArrowDownIcon}
      startAdornment={icon ? <Box sx={{ mr: 0.5, display: "flex", alignItems: "center", color: "text.secondary" }}>{icon}</Box> : undefined}
      renderValue={(v) => (
        <Typography
          variant="body2"
          sx={{ color: v ? "#111827" : "#6B7280", fontWeight: v ? 500 : 400, fontSize: 13 }}
        >
          {v || label}
        </Typography>
      )}
      sx={{
        borderRadius: "8px",
        height: 38,
        fontSize: 13,
        bgcolor: "#fff",
        fontFamily: "inherit",
        "& .MuiOutlinedInput-notchedOutline": { borderColor: "#E5E7EB" },
        "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#7C3AED" },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#7C3AED" },
        minWidth: 148,
      }}
    >
      <MenuItem value="" sx={{ fontSize: 13, color: "#6B7280" }}>All</MenuItem>
      {options.map((opt) => (
        <MenuItem key={opt} value={opt} sx={{ fontSize: 13 }}>{opt}</MenuItem>
      ))}
    </Select>
  </FormControl>
));
FilterSelect.displayName = "FilterSelect";

/** Single memoised table row */
interface MemberRowProps {
  member: Member;
  selected: boolean;
  onSelect: (id: number) => void;
  onEdit: (member: Member) => void;
  onView: (member: Member) => void;
}
const MemberRow = memo(({ member, selected, onSelect, onEdit, onView }: MemberRowProps) => (
  <TableRow selected={selected} hover>
    <TableCell padding="checkbox">
      <Checkbox
        checked={selected}
        onChange={() => onSelect(member.id)}
        size="small"
        sx={{ color: "#D1D5DB", "&.Mui-checked": { color: "#7C3AED" } }}
        inputProps={{ "aria-label": `Select ${member.name}` }}
      />
    </TableCell>
    <TableCell sx={{ fontWeight: 600, color: "#111827" }}>{member.name}</TableCell>
    <TableCell sx={{ color: "#6B7280" }}>{member.date}</TableCell>
    <TableCell><GroupChip group={member.group} /></TableCell>
    <TableCell sx={{ color: "#6B7280" }}>{member.goal}</TableCell>
    <TableCell><StatusChip status={member.status} /></TableCell>
    <TableCell align="center">
      <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
        <Tooltip title="Edit member" arrow>
          <IconButton
            size="small"
            onClick={() => onEdit(member)}
            aria-label={`Edit ${member.name}`}
            sx={{
              width: 34, height: 34,
              border: "1.5px solid #E5E7EB",
              color: "#6B7280",
              "&:hover": { borderColor: "#7C3AED", color: "#7C3AED", bgcolor: alpha("#7C3AED", 0.06) },
            }}
          >
            <EditOutlinedIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="View member" arrow>
          <IconButton
            size="small"
            onClick={() => onView(member)}
            aria-label={`View ${member.name}`}
            sx={{
              width: 34, height: 34,
              border: "1.5px solid #E5E7EB",
              color: "#6B7280",
              "&:hover": { borderColor: "#7C3AED", color: "#7C3AED", bgcolor: alpha("#7C3AED", 0.06) },
            }}
          >
            <VisibilityOutlinedIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Tooltip>
      </Box>
    </TableCell>
  </TableRow>
));
MemberRow.displayName = "MemberRow";

/** Member detail / edit modal */
interface MemberModalProps {
  open: boolean;
  member: Member | null;
  mode: ModalMode;
  onClose: () => void;
}
const MemberModal = memo(({ open, member, mode, onClose }: MemberModalProps) => {
  if (!member) return null;

  const rows: [string, string][] = [
    ["Name",   member.name],
    ["Date",   member.date],
    ["Group",  member.group],
    ["Goal",   member.goal],
    ["Gender", member.gender],
    ["Status", member.status === "fees_paid" ? "Fees Paid" : "Fees Due"],
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "16px",
          boxShadow: "0 24px 64px rgba(0,0,0,0.18)",
          overflow: "hidden",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          p: "20px 24px", fontWeight: 700, fontSize: 17, color: "#111827",
          borderBottom: "1px solid #E5E7EB",
        }}
      >
        {mode === "view" ? "Member Details" : "Edit Member"}
        <IconButton onClick={onClose} size="small" aria-label="Close" sx={{ color: "#6B7280" }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: "8px 24px 24px" }}>
        {rows.map(([key, val], idx) => (
          <React.Fragment key={key}>
            <Box sx={{ display: "flex", justifyContent: "space-between", py: 1.5 }}>
              <Typography variant="body2" sx={{ color: "#6B7280", fontWeight: 500 }}>{key}</Typography>
              <Typography variant="body2" sx={{ color: "#111827", fontWeight: 700 }}>
                {key === "Status" ? (
                  <Chip
                    label={val}
                    size="small"
                    sx={{
                      bgcolor: val === "Fees Paid" ? "#DCFCE7" : "#FEE2E2",
                      color:   val === "Fees Paid" ? "#16A34A" : "#EF4444",
                      fontWeight: 700, fontSize: 12,
                    }}
                  />
                ) : val}
              </Typography>
            </Box>
            {idx < rows.length - 1 && <Divider sx={{ borderColor: "#F1F5F9" }} />}
          </React.Fragment>
        ))}
      </DialogContent>
    </Dialog>
  );
});
MemberModal.displayName = "MemberModal";

// ─── Main Page Component ───────────────────────────────────────────────────────
const GymMembersList = () => {
  const [loading, setLoading]   = useState<boolean>(true);
  const [members]               = useState<Member[]>(MOCK_MEMBERS);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [filters, setFilters]   = useState<MemberFilters>({ group: "", mode: "", gender: "" });
  const [search, setSearch]     = useState<string>("");
  const [modal, setModal]       = useState<ModalState>({ open: false, member: null, mode: "view" });
  const [page, setPage]         = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);

  // Simulate initial data fetch
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  const setFilter = useCallback(
    <K extends keyof MemberFilters>(key: K, val: MemberFilters[K]) => {
      setFilters((prev) => ({ ...prev, [key]: val }));
    },
    []
  );

  const filteredMembers = useMemo<Member[]>(() => {
    return members.filter((m) => {
      if (search && !m.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (filters.group  && m.group  !== filters.group)  return false;
      if (filters.mode   && m.status !== filters.mode)   return false;
      if (filters.gender && m.gender !== filters.gender) return false;
      return true;
    });
  }, [members, search, filters]);

  const pagedMembers = useMemo(
    () => filteredMembers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [filteredMembers, page, rowsPerPage]
  );

  const allSelected = useMemo(
    () => filteredMembers.length > 0 && filteredMembers.every((m) => selected.has(m.id)),
    [filteredMembers, selected]
  );

  const someSelected = useMemo(
    () => selected.size > 0 && !allSelected,
    [selected.size, allSelected]
  );

  const toggleAll = useCallback(() => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (allSelected) filteredMembers.forEach((m) => next.delete(m.id));
      else filteredMembers.forEach((m) => next.add(m.id));
      return next;
    });
  }, [allSelected, filteredMembers]);

  const toggleOne = useCallback((id: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const handleEdit = useCallback((member: Member) => setModal({ open: true, member, mode: "edit" }), []);
  const handleView = useCallback((member: Member) => setModal({ open: true, member, mode: "view" }), []);
  const closeModal = useCallback(() => setModal({ open: false, member: null, mode: "view" }), []);
  const handleChangePage = useCallback((_: unknown, newPage: number) => {
    setPage(newPage);
  }, []);
  const handleChangeRowsPerPage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const next = parseInt(event.target.value, 10);
    setRowsPerPage(next);
    setPage(0);
  }, []);

  return (
    <ThemeProvider theme={gymTheme}>
      <Box sx={{ bgcolor: "background.default", minHeight: "100%", p: { xs: "16px", sm: "20px 24px" } }}>

        {/* ── Top Header ── */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3, flexWrap: "wrap", gap: 1.5 }}>

          {/* Search */}
          <Paper
            elevation={0}
            sx={{
              display: "flex", alignItems: "center", gap: 1,
              px: 2, py: 0.75, borderRadius: 50,
              border: "1.5px solid #E5E7EB", flex: "1 1 260px", maxWidth: 380,
              "&:focus-within": { borderColor: "#7C3AED", boxShadow: "0 0 0 3px rgba(124,58,237,.1)" },
              transition: "box-shadow 0.2s, border-color 0.2s",
            }}
          >
            <SearchIcon sx={{ color: "#9CA3AF", fontSize: 20 }} />
            <InputBase
              placeholder="Search your member ..."
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
              sx={{ flex: 1, fontSize: 14, fontFamily: "inherit", "& input": { p: 0 } }}
              inputProps={{ "aria-label": "Search members" }}
            />
          </Paper>

          {/* Right actions */}
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                borderRadius: 50, textTransform: "none", fontWeight: 700,
                fontSize: 14, px: 3, py: 1.1, bgcolor: "#7C3AED",
                boxShadow: "none",
                "&:hover": { bgcolor: "#6D28D9", boxShadow: "0 4px 14px rgba(124,58,237,.35)" },
              }}
            >
              Create New Member
            </Button>

            <Tooltip title="Notifications" arrow>
              <IconButton
                sx={{
                  width: 42, height: 42,
                  border: "1.5px solid #E5E7EB",
                  bgcolor: "#fff",
                  "&:hover": { borderColor: "#7C3AED" },
                }}
              >
                <Badge badgeContent={2} color="error" sx={{ "& .MuiBadge-badge": { fontSize: 10, minWidth: 16, height: 16 } }}>
                  <NotificationsOutlinedIcon sx={{ fontSize: 20, color: "#6B7280" }} />
                </Badge>
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>

        {/* ── Table Card ── */}
        <Paper elevation={0}>

          {/* Card Header */}
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: "20px 24px 12px", flexWrap: "wrap", gap: 1.5 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: 17, color: "#111827", letterSpacing: "-0.3px" }}>
              List Of GYM Members
            </Typography>
            <Button
              variant="outlined"
              startIcon={<GroupAddOutlinedIcon sx={{ fontSize: 18 }} />}
              sx={{
                borderRadius: "10px", textTransform: "none", fontWeight: 600,
                fontSize: 13, color: "#111827", borderColor: "#E5E7EB",
                "&:hover": { borderColor: "#7C3AED", color: "#7C3AED", bgcolor: alpha("#7C3AED", 0.04) },
              }}
            >
              Create New Group
            </Button>
          </Box>

          {/* Filters Row */}
          <Box sx={{ display: "flex", gap: 1.25, px: 3, pb: 2, flexWrap: "wrap" }}>
            <FilterSelect
              label="Select Group"
              value={filters.group}
              options={GROUPS}
              onChange={(v) => setFilter("group", v as MemberGroup | "")}
            />
            <FilterSelect
              label="Select Mode"
              value={filters.mode}
              options={["fees_paid", "fees_due"]}
              onChange={(v) => setFilter("mode", v as MemberStatus | "")}
            />
            <FilterSelect
              label="Select Gender"
              value={filters.gender}
              options={GENDERS}
              onChange={(v) => setFilter("gender", v as MemberGender | "")}
            />

            {/* Date placeholder (non-functional UI) */}
            <Box
              sx={{
                display: "flex", alignItems: "center", gap: 0.75,
                px: 1.75, height: 38, border: "1.5px solid #E5E7EB",
                borderRadius: "8px", bgcolor: "#fff", cursor: "pointer",
                "&:hover": { borderColor: "#7C3AED" },
                minWidth: 148,
              }}
            >
              <Typography variant="body2" sx={{ color: "#6B7280", fontSize: 13 }}>Select Date</Typography>
              <CalendarTodayOutlinedIcon sx={{ fontSize: 16, color: "#9CA3AF", ml: "auto" }} />
            </Box>
          </Box>

          {/* ── MUI Table ── */}
          <TableContainer sx={{ borderRadius: 0, maxHeight: 520, overflowY: "auto" }}>
            <Table stickyHeader aria-label="GYM Members table">
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox" sx={{ bgcolor: "#F8FAFC", borderBottom: "1px solid #E5E7EB" }}>
                    <Checkbox
                      checked={allSelected}
                      indeterminate={someSelected}
                      onChange={toggleAll}
                      size="small"
                      sx={{ color: "#D1D5DB", "&.Mui-checked, &.MuiCheckbox-indeterminate": { color: "#7C3AED" } }}
                      inputProps={{ "aria-label": "Select all members" }}
                    />
                  </TableCell>
                  {TABLE_COLUMNS.map((col) => (
                    <TableCell
                      key={col}
                      align={col === "Action" ? "center" : "left"}
                      sx={{ bgcolor: "#F8FAFC", borderBottom: "1px solid #E5E7EB" }}
                    >
                      {col}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {loading ? (
                  Array.from({ length: rowsPerPage }).map((_, i) => <SkeletonRow key={i} />)
                ) : filteredMembers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 8, color: "#9CA3AF", fontSize: 15 }}>
                      No members found matching your filters
                    </TableCell>
                  </TableRow>
                ) : (
                  pagedMembers.map((member) => (
                    <MemberRow
                      key={member.id}
                      member={member}
                      selected={selected.has(member.id)}
                      onSelect={toggleOne}
                      onEdit={handleEdit}
                      onView={handleView}
                    />
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Footer */}
          {!loading && (
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: 3, py: 1.5, borderTop: "1px solid #E5E7EB", bgcolor: "#FAFAFA" }}>
              <Typography variant="body2" sx={{ color: "#6B7280", fontSize: 13 }}>
                {filteredMembers.length} member{filteredMembers.length !== 1 ? "s" : ""}
              </Typography>
              {selected.size > 0 && (
                <Chip
                  label={`${selected.size} selected`}
                  size="small"
                  sx={{ bgcolor: alpha("#7C3AED", 0.1), color: "#7C3AED", fontWeight: 700, fontSize: 12 }}
                />
              )}
            </Box>
          )}
          {!loading && (
            <TablePagination
              component="div"
              count={filteredMembers.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25]}
              sx={{
                borderTop: "1px solid #E5E7EB",
                "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
                  fontSize: 13,
                  color: "#6B7280",
                },
              }}
            />
          )}
        </Paper>
      </Box>

      {/* ── Member Modal ── */}
      <MemberModal
        open={modal.open}
        member={modal.member}
        mode={modal.mode}
        onClose={closeModal}
      />
    </ThemeProvider>
  );
};

export default GymMembersList;
