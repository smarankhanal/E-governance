import { FiUsers, FiClock, FiCheckCircle, FiXCircle } from "react-icons/fi";

export default function ApplicationStats({ applications }) {
  const count = (status) =>
    applications.filter((application) => application.status === status).length;

  const stats = [
    [
      "Total applications",
      applications.length,
      FiUsers,
      "bg-slate-100 text-slate-600",
    ],
    ["Pending", count("Pending"), FiClock, "bg-amber-50 text-amber-600"],
    [
      "Approved",
      count("Approved"),
      FiCheckCircle,
      "bg-emerald-50 text-emerald-600",
    ],
    ["Rejected", count("Rejected"), FiXCircle, "bg-rose-50 text-rose-600"],
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map(([label, value, Icon, iconClass]) => (
        <div
          key={label}
          className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4"
        >
          <div
            className={`grid h-11 w-11 place-items-center rounded-lg ${iconClass}`}
          >
            <Icon size={20} />
          </div>

          <div>
            <p className="text-sm text-slate-500">{label}</p>
            <p className="text-2xl font-semibold text-slate-900">{value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
