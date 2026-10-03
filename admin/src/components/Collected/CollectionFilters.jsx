import { FiSearch } from "react-icons/fi";
import { FilterTabs } from "../../components";

export default function CollectionFilters({
  search,
  setSearch,
  filter,
  setFilter,
}) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4">
      <div className="relative w-full sm:max-w-md">
        <FiSearch
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search applicant, application or passport number..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-[#009DAC] focus:bg-white focus:ring-2 focus:ring-[#009DAC]/10"
        />
      </div>

      <FilterTabs
        options={["All", "Collected", "Not Collected"]}
        value={filter}
        onChange={setFilter}
      />
    </div>
  );
}
