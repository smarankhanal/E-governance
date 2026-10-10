import { useMemo, useState } from "react";
import {
  FiClipboard,
  FiClock,
  FiCheckCircle,
  FiFileText,
} from "react-icons/fi";

import {
  DashboardFilters,
  DashboardStats,
  ApplicationOverview,
  OfficeBreakdown,
} from "../features/dashboard";

import { APPLICATIONS, FILTER_OPTIONS } from "../data/dashboardData";

import {
  filterApplications,
  getApplicationStats,
  getStatusBreakdown,
  getApplicationTypes,
  getOfficeBreakdown,
  getWeeklyData,
  formatNumber,
} from "../features/dashboard/dashboardUtils";

export default function Dashboard({ onNavigate = () => {} }) {
  const [filters, setFilters] = useState({
    dateFrom: "",
    dateTo: "",
    province: "All Provinces",
    district: "All Districts",
    office: "All Offices",
    passportType: "All Types",
    status: "All Status",
    ageGroup: "All Ages",
  });

  const filteredApplications = useMemo(
    () => filterApplications(APPLICATIONS, filters),
    [filters],
  );

  const stats = useMemo(() => {
    const result = getApplicationStats(filteredApplications);

    return {
      ...result,

      icons: {
        clipboard: FiClipboard,
        clock: FiClock,
        file: FiFileText,
        check: FiCheckCircle,
      },
    };
  }, [filteredApplications]);

  const statusBreakdown = useMemo(
    () => getStatusBreakdown(filteredApplications),
    [filteredApplications],
  );

  const applicationTypes = useMemo(
    () => getApplicationTypes(filteredApplications),
    [filteredApplications],
  );

  const offices = useMemo(
    () => getOfficeBreakdown(filteredApplications),
    [filteredApplications],
  );

  const weekly = useMemo(
    () => getWeeklyData(filteredApplications),
    [filteredApplications],
  );

  const updateFilter = (key, value) => {
    setFilters((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      dateFrom: "",
      dateTo: "",
      province: "All Provinces",
      district: "All Districts",
      office: "All Offices",
      passportType: "All Types",
      status: "All Status",
      ageGroup: "All Ages",
    });
  };

  const hour = new Date().getHours();

  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">
          {greeting}, Administrator
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Monitor passport applications and processing activity across all
          offices.
        </p>
      </div>

      {/* Filters */}
      <DashboardFilters
        filters={filters}
        onFilterChange={updateFilter}
        onReset={resetFilters}
        options={FILTER_OPTIONS}
      />

      {/* Result count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">
          Showing{" "}
          <span className="font-semibold text-slate-700">
            {formatNumber(filteredApplications.length)}
          </span>{" "}
          applications
        </p>
      </div>

      {/* Statistics */}
      <DashboardStats stats={stats} />

      {/* Charts */}
      <ApplicationOverview weekly={weekly} statusBreakdown={statusBreakdown} />

      {/* Breakdown */}
      <div className="grid grid-cols-1 gap-6">
        <OfficeBreakdown offices={offices} onNavigate={onNavigate} />
      </div>
    </div>
  );
}
