import { FiFilter, FiRefreshCw } from "react-icons/fi";

export default function DashboardFilters({
  filters,
  onFilterChange,
  onReset,
  options,
}) {
  const SelectFilter = ({ label, value, filterKey, choices }) => (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-slate-600">
        {label}
      </label>

      <select
        value={value}
        onChange={(event) => onFilterChange(filterKey, event.target.value)}
        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-[#0e9fb0] focus:ring-2 focus:ring-[#0e9fb0]/10"
      >
        {choices.map((choice) => (
          <option key={choice} value={choice}>
            {choice}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#17385f]/10 text-[#17385f]">
            <FiFilter size={17} />
          </div>

          <div>
            <h2 className="font-semibold text-slate-900">
              Application filters
            </h2>

            <p className="text-xs text-slate-500">
              Filter dashboard data using application details.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-2 self-start rounded-lg px-3 py-2 text-sm font-medium text-[#17385f] transition hover:bg-slate-50 sm:self-auto"
        >
          <FiRefreshCw size={14} />
          Reset filters
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-600">
            From date
          </label>

          <input
            type="date"
            value={filters.dateFrom}
            onChange={(event) => onFilterChange("dateFrom", event.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-[#0e9fb0] focus:ring-2 focus:ring-[#0e9fb0]/10"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-600">
            To date
          </label>

          <input
            type="date"
            value={filters.dateTo}
            onChange={(event) => onFilterChange("dateTo", event.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-[#0e9fb0] focus:ring-2 focus:ring-[#0e9fb0]/10"
          />
        </div>

        <SelectFilter
          label="Province"
          value={filters.province}
          filterKey="province"
          choices={options.provinces}
        />

        <SelectFilter
          label="District"
          value={filters.district}
          filterKey="district"
          choices={options.districts}
        />

        <SelectFilter
          label="Office"
          value={filters.office}
          filterKey="office"
          choices={options.offices}
        />

        <SelectFilter
          label="Passport type"
          value={filters.passportType}
          filterKey="passportType"
          choices={options.passportTypes}
        />

        <SelectFilter
          label="Application status"
          value={filters.status}
          filterKey="status"
          choices={options.statuses}
        />

        <SelectFilter
          label="Age group"
          value={filters.ageGroup}
          filterKey="ageGroup"
          choices={options.ageGroups}
        />
      </div>
    </div>
  );
}
