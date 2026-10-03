import { FiSearch } from "react-icons/fi";

import {
  TYPES,
  inputCls,
} from "../../features/applications/applicationUtils/applicationUi";

export default function UserFilters({
  typeFilter,
  setTypeFilter,
  query,
  setQuery,
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 p-4">
      <div className="flex flex-wrap gap-1 rounded-lg bg-slate-100 p-1">
        {["All", ...TYPES].map((type) => (
          <button
            key={type}
            onClick={() => setTypeFilter(type)}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
              typeFilter === type
                ? "bg-white text-[#17385f] shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            {type}
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
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search name, email, phone, NIN or ID"
          className={`${inputCls} pl-9`}
        />
      </div>
    </div>
  );
}
