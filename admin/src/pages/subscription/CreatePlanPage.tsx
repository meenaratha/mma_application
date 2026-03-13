import { useState } from "react";

const inputCls =
  "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent transition bg-white";

const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const ChevronLeft = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

export default function CreatePlanPage() {
  const [includes, setIncludes] = useState<string[]>([]);
  const [inputVal, setInputVal] = useState("");

  const addInclude = () => {
    const trimmed = inputVal.trim();
    if (trimmed) {
      setIncludes((prev) => [...prev, trimmed]);
      setInputVal("");
    }
  };

  const removeInclude = (i: number) =>
    setIncludes((prev) => prev.filter((_, idx) => idx !== i));

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg p-6 sm:p-8">

        {/* Header */}
        <div className="flex items-center gap-3 mb-7">
          <button
            type="button"
            className="p-1 rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
          >
            <ChevronLeft />
          </button>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Create a plan</h1>
        </div>

        <div className="flex flex-col gap-5">

          {/* Row 1: Plan Name | Start Date | End Date | Plan Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <input type="text" placeholder="Plan Name" className={inputCls} />

            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <CalendarIcon />
              </span>
              <input type="date" className={`${inputCls} pl-9`} />
            </div>

            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <CalendarIcon />
              </span>
              <input type="date" className={`${inputCls} pl-9`} />
            </div>

            <div className="relative">
              <select className={`${inputCls} appearance-none pr-10 cursor-pointer`} defaultValue="">
                <option value="" disabled>Plan Type</option>
                <option>Basic</option>
                <option>Premium</option>
                <option>Diamond</option>
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                  <path d="M5 7.5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </div>

          {/* Row 2: Month Base | Amount | Year Base | Amount */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className={`${inputCls} font-bold text-gray-900 cursor-default`}>
              Month Base
            </div>
            <input type="number" placeholder="Enter Amount" className={inputCls} />
            <div className={`${inputCls} font-bold text-gray-900 cursor-default`}>
              Year Base
            </div>
            <input type="number" placeholder="Enter Amount" className={inputCls} />
          </div>

          {/* Add Includes In Plan */}
          <div className="border border-gray-200 rounded-xl p-4 min-h-[120px]">
            <div className="flex flex-wrap gap-2 mb-3">
              {includes.map((item, i) => (
                <span
                  key={i}
                  className="flex items-center gap-1.5 bg-purple-100 text-purple-700 text-xs font-medium px-3 py-1.5 rounded-full"
                >
                  {item}
                  <button
                    type="button"
                    onClick={() => removeInclude(i)}
                    className="hover:text-purple-900 transition-colors"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={addInclude}
                className="flex items-center gap-1.5 border border-gray-300 rounded-lg px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors whitespace-nowrap"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Add Includes In Plan
              </button>
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addInclude()}
                placeholder="Type and press Enter or click +"
                className="flex-1 text-sm border-0 outline-none text-gray-600 placeholder-gray-300"
              />
            </div>
          </div>

          {/* Row 3: Short Description | Add Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <textarea
              rows={5}
              placeholder="Short Description"
              className={`${inputCls} resize-none`}
            />
            <textarea
              rows={5}
              placeholder="Add  Features"
              className={`${inputCls} resize-none`}
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-center pt-1">
            <button
              type="button"
              className="w-full max-w-sm py-4 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white font-semibold text-base rounded-2xl transition-colors shadow-md"
            >
              Save
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}