import React from "react";
import { FiSearch } from "react-icons/fi";

export default function OfficeFilters({
  provinces,
  selectedProvince,
  onProvinceChange,
  query,
  onQueryChange,
}) {
  const inputCls =
    "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#0e9fb0] focus:outline-none focus:ring-2 focus:ring-[#0e9fb0]/20";

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap gap-1 rounded-lg bg-slate-100 p-1">
        {provinces.map((province) => (
          <button
            type="button"
            key={province}
            onClick={() => onProvinceChange(province)}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
              selectedProvince === province
                ? "bg-white text-[#17385f] shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            {province}
          </button>
        ))}
      </div>

      <div className="relative w-full sm:w-72">
        <FiSearch
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          size={16}
        />

        <input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search office, code or district"
          className={`${inputCls} pl-9`}
        />
      </div>
    </div>
  );
}
