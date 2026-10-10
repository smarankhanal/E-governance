import { FiXCircle } from "react-icons/fi";

import { StatCard } from "../index";

export default function DashboardStats({ stats }) {
  const statCards = [
    {
      label: "Total applications",
      value: stats.total,
      change: 8.2,
      icon: stats.icons.clipboard,
      tone: "bg-[#17385f]/10 text-[#17385f]",
    },
    {
      label: "Pending applications",
      value: stats.pending,
      change: -3.1,
      icon: stats.icons.clock,
      tone: "bg-amber-50 text-amber-600",
    },
    {
      label: "In review",
      value: stats.inReview,
      change: 5.4,
      icon: stats.icons.file,
      tone: "bg-cyan-50 text-cyan-600",
    },
    {
      label: "Approved",
      value: stats.approved,
      change: 12.4,
      icon: stats.icons.check,
      tone: "bg-emerald-50 text-emerald-600",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>

      <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-50 text-rose-600">
            <FiXCircle size={17} />
          </div>

          <div>
            <p className="text-sm font-medium text-slate-700">
              Rejected applications
            </p>

            <p className="text-xs text-slate-500">
              Low-frequency application outcome
            </p>
          </div>
        </div>

        <p className="text-lg font-semibold text-slate-900">{stats.rejected}</p>
      </div>
    </div>
  );
}
