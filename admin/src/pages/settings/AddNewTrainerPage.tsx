import { useState } from "react";

// ── ICONS ─────────────────────────────────────────────────────────────────────
const ChevronDown = () => (
  <svg width="15" height="15" viewBox="0 0 20 20" fill="none">
    <path d="M5 7.5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const CalendarIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const BackIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 18l-6-6 6-6"/>
  </svg>
);

// ── SHARED STYLES ─────────────────────────────────────────────────────────────
const inputCls =
  "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent transition bg-white";

const SelectField = ({
  placeholder,
  options = [],
}: {
  placeholder: string;
  options?: string[];
}) => (
  <div className="relative w-full">
    <select
      className={`${inputCls} appearance-none pr-9 cursor-pointer`}
      defaultValue=""
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
      <ChevronDown />
    </span>
  </div>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-sm font-bold text-gray-800 mb-4">{children}</h3>
);

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
interface AddNewTrainerPageProps {
  onBack?: () => void;
}

export default function AddNewTrainerPage({ onBack }: AddNewTrainerPageProps) {
  const [form, setForm] = useState({
    trainerId: "",
    fullName: "",
    mobileNumber: "",
    email: "",
    gender: "",
    dateOfJoining: "",
    specialization: "",
    experience: "",
    certification: "",
    salaryType: "",
    salaryAmount: "",
    workingDays: "",
    workingTime: "",
    username: "",
    password: "",
  });

  const handle = (field: string) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setForm((p) => ({ ...p, [field]: e.target.value }));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top nav bar */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
        >
          <BackIcon />
          Back
        </button>
        <h1 className="text-base font-bold text-gray-900 absolute left-1/2 -translate-x-1/2">
          Add New Trainer
        </h1>
        <div className="w-16" /> {/* spacer */}
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 flex flex-col gap-8">

          {/* ── Basic Details ── */}
          <section>
            <SectionTitle>Basic Details</SectionTitle>
            <div className="flex flex-col gap-4">
              {/* Row 1 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Trainer ID"
                  value={form.trainerId}
                  onChange={handle("trainerId")}
                  className={inputCls}
                />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={form.fullName}
                  onChange={handle("fullName")}
                  className={inputCls}
                />
                <input
                  type="tel"
                  placeholder="Mobile Number"
                  value={form.mobileNumber}
                  onChange={handle("mobileNumber")}
                  className={inputCls}
                />
              </div>
              {/* Row 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handle("email")}
                  className={inputCls}
                />
                <SelectField
                  placeholder="Gender"
                  options={["Male", "Female", "Other"]}
                />
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <CalendarIcon />
                  </span>
                  <input
                    type="date"
                    value={form.dateOfJoining}
                    onChange={handle("dateOfJoining")}
                    className={`${inputCls} pl-9`}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* ── Professional Details ── */}
          <section>
            <SectionTitle>Professional Details</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <SelectField
                placeholder="Specialization"
                options={[
                  "GYM Trainee",
                  "Yoga Instructor",
                  "Zumba Coach",
                  "Nutritionist",
                  "CrossFit Trainer",
                ]}
              />
              <input
                type="text"
                placeholder="Experience (Years)"
                value={form.experience}
                onChange={handle("experience")}
                className={inputCls}
              />
              <SelectField
                placeholder="Certification (if any)"
                options={[
                  "None",
                  "ACE",
                  "NASM",
                  "ISSA",
                  "ACSM",
                  "Other",
                ]}
              />
            </div>
          </section>

          {/* ── Salary Details + Availability (side by side on desktop) ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Salary Details */}
            <section>
              <SectionTitle>Salary Details</SectionTitle>
              <div className="flex flex-col gap-4">
                <SelectField
                  placeholder="Salary Type"
                  options={["Monthly", "Weekly", "Daily", "Hourly"]}
                />
                <input
                  type="number"
                  placeholder="Salary Amount"
                  value={form.salaryAmount}
                  onChange={handle("salaryAmount")}
                  className={inputCls}
                />
              </div>
            </section>

            {/* Availability */}
            <section>
              <SectionTitle>Availability</SectionTitle>
              <div className="flex flex-col gap-4">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <CalendarIcon />
                  </span>
                  <input
                    type="text"
                    placeholder="Working Days"
                    value={form.workingDays}
                    onChange={handle("workingDays")}
                    className={`${inputCls} pl-9`}
                  />
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <CalendarIcon />
                  </span>
                  <input
                    type="text"
                    placeholder="Working Time"
                    value={form.workingTime}
                    onChange={handle("workingTime")}
                    className={`${inputCls} pl-9`}
                  />
                </div>
              </div>
            </section>
          </div>

          {/* ── Access Control ── */}
          <section>
            <SectionTitle>Access Control</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Username"
                value={form.username}
                onChange={handle("username")}
                className={inputCls}
              />
              <input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={handle("password")}
                className={inputCls}
              />
            </div>
          </section>

          {/* ── Save ── */}
          <div className="flex justify-center pt-2">
            <button
              type="button"
              className="w-full max-w-xs py-4 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white font-semibold rounded-2xl transition-colors shadow-md text-base"
            >
              Save
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}