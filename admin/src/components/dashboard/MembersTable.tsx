import React, { useState, useMemo, useCallback } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Select,
  MenuItem,
  Typography,
  Chip,
  InputAdornment,
  FormControl,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import type { Member } from '../../types';

interface MembersTableProps {
  members: Member[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  className?: string;
}

const STATUS_COLORS: Record<string, "success" | "warning" | "error" | "default"> = {
  Paid: 'success',
  Pending: 'warning',
  Overdue: 'error',
};

const FILTER_OPTIONS = ['All', 'Paid', 'Pending', 'Overdue'];

const MembersTable: React.FC<MembersTableProps> = React.memo(({
  members,
  searchQuery,
  onSearchChange,
  className = '',
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [statusFilter, setStatusFilter] = useState('All');

  const handleChangePage = useCallback((event: unknown, newPage: number) => {
    void event;
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);

  const handleFilterChange = useCallback((event: SelectChangeEvent) => {
    setStatusFilter(event.target.value);
    setPage(0);
  }, []);

  // Filter logic
  const filteredMembers = useMemo(() => {
    let data = members;
    if (statusFilter !== 'All') {
      data = data.filter((m) => m.status === statusFilter);
    }
    return data;
  }, [members, statusFilter]);

  // Pagination logic
  const paginatedMembers = useMemo(() => {
    return filteredMembers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [filteredMembers, page, rowsPerPage]);

  return (
    <Paper
      elevation={0}
      className={className}
      sx={{
        p: 3,
        borderRadius: 4,
        border: '1px solid',
        borderColor: 'divider',
        width: '100%',
        overflow: 'hidden'
      }}
    >
      {/* Header Section */}
      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'col', sm: 'row' },
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: 3,
        gap: 2,
        flexWrap: 'wrap'
      }}>
        <Typography variant="h6" fontWeight={700} color="text.primary">
          All Members List
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flex: 1, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
          {/* Search */}
          <TextField
            placeholder="Search your member..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            size="small"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
              sx: { borderRadius: 3, bgcolor: 'background.paper', fontSize: '0.875rem' }
            }}
            sx={{ minWidth: { xs: '100%', sm: 240 } }}
          />

          {/* Filter */}
          <FormControl size="small">
            <Select
              value={statusFilter}
              onChange={handleFilterChange}
              displayEmpty
              sx={{ borderRadius: 3, minWidth: 120, fontSize: '0.875rem', bgcolor: 'background.paper' }}
            >
              {FILTER_OPTIONS.map((option) => (
                <MenuItem key={option} value={option} sx={{ fontSize: '0.875rem' }}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Table Section */}
      <TableContainer>
        <Table sx={{ minWidth: 700 }} aria-label="members table">
          <TableHead>
            <TableRow>
              {['Member Name', 'Register ID', 'Age', 'Plan', 'Date', 'Status'].map((col) => (
                <TableCell
                  key={col}
                  sx={{
                    fontWeight: 600,
                    color: 'warning.dark',
                    borderBottom: '1px dashed',
                    borderColor: 'divider',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {col}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedMembers.length > 0 ? (
              paginatedMembers.map((member) => (
                <TableRow
                  key={member.id}
                  hover
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell sx={{ fontWeight: 500, color: 'text.primary' }}>{member.name}</TableCell>
                  <TableCell sx={{ color: 'text.secondary' }}>{member.registerId}</TableCell>
                  <TableCell sx={{ color: 'text.secondary' }}>{member.age}</TableCell>
                  <TableCell sx={{ color: 'text.secondary' }}>{member.plan}</TableCell>
                  <TableCell sx={{ color: 'text.secondary' }}>{member.date}</TableCell>
                  <TableCell>
                    <Chip
                      label={member.status}
                      color={STATUS_COLORS[member.status] || 'default'}
                      size="small"
                      sx={{ fontWeight: 600, borderRadius: 1.5, height: 24 }}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 6, color: 'text.secondary' }}>
                  No members found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredMembers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ borderTop: '1px solid', borderColor: 'divider' }}
      />
    </Paper>
  );
});

MembersTable.displayName = 'MembersTable';

export default MembersTable;
