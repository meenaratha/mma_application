import { useState, useRef } from "react";

type Tab = "post" | "event";

const UploadBox = ({ small = false }: { small?: boolean }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFileName(e.target.files[0].name);
  };

  return (
    <div
      className={`border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-purple-300 transition-colors bg-gray-50 ${small ? "py-6 px-4" : "py-10 px-4"}`}
      onClick={() => inputRef.current?.click()}
    >
      <input ref={inputRef} type="file" className="hidden" onChange={handleFile} />
      {/* image placeholder icon */}
      <div className="relative w-14 h-10 mb-1">
        <div className="absolute inset-0 bg-blue-100 rounded-lg rotate-3" />
        <div className="absolute inset-0 bg-white border border-blue-200 rounded-lg flex items-end overflow-hidden">
          <div className="w-full h-5 bg-gradient-to-t from-green-300 to-blue-200" />
        </div>
        <div className="absolute top-1 left-1 w-2 h-2 bg-yellow-300 rounded-full" />
      </div>
      <p className="text-sm text-gray-500">
        {fileName ? fileName : "Choose a file to upload"}
      </p>
      <button
        type="button"
        className="mt-1 px-5 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-colors"
        onClick={(e) => {
          e.stopPropagation();
          inputRef.current?.click();
        }}
      >
        Upload
      </button>
    </div>
  );
};

const inputCls =
  "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent transition bg-white";

const SelectField = ({
  placeholder,
  className = "",
}: {
  placeholder: string;
  className?: string;
}) => (
  <div className={`relative ${className}`}>
    <select className={`${inputCls} appearance-none pr-10 cursor-pointer`} defaultValue="">
      <option value="" disabled>
        {placeholder}
      </option>
    </select>
    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
      <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
        <path d="M5 7.5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  </div>
);

// ── CREATE POST ──────────────────────────────────────────────────────────────
const CreatePostPanel = () => {
  const categories = [
    { label: "Basic Members", color: "bg-yellow-100 text-yellow-700" },
    { label: "Premium Members", color: "bg-green-100 text-green-700" },
    { label: "Diamond Members", color: "bg-purple-100 text-purple-700" },
  ];

  const [selected, setSelected] = useState<string[]>([]);
  const toggle = (label: string) =>
    setSelected((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );

  return (
    <div className="flex flex-col lg:flex-row gap-5">
      {/* Left column */}
      <div className="flex flex-col gap-5 w-full lg:w-5/12">
        {/* Schedule Post */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Schedule Post</h2>
          <UploadBox />
        </div>
        {/* Group Categories */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Group Categories</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((c) => (
              <button
                key={c.label}
                type="button"
                onClick={() => toggle(c.label)}
                className={`px-5 py-2 rounded-xl text-sm font-medium transition-all border-2 ${c.color} ${
                  selected.includes(c.label)
                    ? "border-purple-500 shadow-md scale-105"
                    : "border-transparent"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right column */}
      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-4">
        {/* Heading */}
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h7" strokeLinecap="round" />
            </svg>
          </span>
          <input type="text" placeholder="Heading" className={`${inputCls} pl-9`} />
        </div>

        {/* Caption */}
        <textarea
          rows={8}
          placeholder="Write a caption here ..."
          className={`${inputCls} resize-none`}
        />

        {/* Tag a person */}
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
              <line x1="7" y1="7" x2="7.01" y2="7" />
            </svg>
          </span>
          <input type="text" placeholder="Tag a person" className={`${inputCls} pl-9`} />
        </div>

        {/* Date + Post button */}
        <div className="flex flex-col sm:flex-row gap-3 mt-auto">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </span>
            <input type="date" className={`${inputCls} pl-9`} />
          </div>
          <button
            type="button"
            className="px-10 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-colors shadow-md"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

// ── CREATE EVENT ─────────────────────────────────────────────────────────────
const CreateEventPanel = () => (
  <div className="flex flex-col lg:flex-row gap-5">
    {/* Left column – Event Details */}
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 w-full lg:w-5/12">
      <h2 className="text-lg font-bold text-gray-800 mb-5">Event Details</h2>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <input type="text" placeholder="Event Name" className={`${inputCls} flex-1`} />
          <SelectField placeholder="Event Type" className="flex-1" />
        </div>
        <textarea rows={3} placeholder="Short Description" className={`${inputCls} resize-none`} />
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </span>
            <input type="date" className={`${inputCls} pl-9`} />
          </div>
          <SelectField placeholder="Gym Branch Name" className="flex-1" />
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <SelectField placeholder="Age Limit" className="flex-1" />
          <SelectField placeholder="Eligibility" className="flex-1" />
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <SelectField placeholder="Maximum Participants" className="flex-1" />
          <input type="text" placeholder="Contact Number" className={`${inputCls} flex-1`} />
        </div>
      </div>
    </div>

    {/* Right column – fees & upload */}
    <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <SelectField placeholder="Event Fee Type" className="flex-1" />
        <input type="text" placeholder="Event Fee" className={`${inputCls} flex-1`} />
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <SelectField placeholder="Payment Mode" className="flex-1" />
        <SelectField placeholder="Certificates Provided" className="flex-1" />
      </div>
      <SelectField placeholder="Prizes / Rewards" className="w-full sm:w-1/2" />
      <UploadBox small />
      <div className="flex justify-end mt-auto">
        <button
          type="button"
          className="px-10 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-colors shadow-md"
        >
          Create Event
        </button>
      </div>
    </div>
  </div>
);

// ── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function CreatePostEventPage() {
  const [tab, setTab] = useState<Tab>("post");

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      {/* Tab switcher */}
      <div className="flex gap-3 mb-6">
        {(
          [
            { key: "post", label: "Create Post", icon: "🗺️" },
            { key: "event", label: "Create New Event", icon: "📋" },
          ] as { key: Tab; label: string; icon: string }[]
        ).map(({ key, label, icon }) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 font-medium text-sm transition-all ${
              tab === key
                ? "border-purple-500 text-purple-600 bg-white shadow-sm"
                : "border-gray-200 text-gray-600 bg-white hover:border-gray-300"
            }`}
          >
            <span>{icon}</span>
            {label}
          </button>
        ))}
      </div>

      {/* Panel */}
      {tab === "post" ? <CreatePostPanel /> : <CreateEventPanel />}
    </div>
  );
}