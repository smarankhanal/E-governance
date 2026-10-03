import { FiUsers, FiUserPlus, FiRefreshCw, FiUser } from "react-icons/fi";

import { applicationType } from "../../features/applications/applicationUtils/applicationUi";

export default function UserStats({ users }) {
  const countType = (type) =>
    users.filter((user) => applicationType(user) === type).length;

  const stats = [
    ["Total users", users.length, FiUsers, "bg-slate-100 text-slate-600"],
    ["New passports", countType("NEW"), FiUserPlus, "bg-sky-50 text-sky-600"],
    ["Renewals", countType("RENEWAL"), FiRefreshCw, "bg-teal-50 text-teal-600"],
    [
      "Minors",
      users.filter((user) => user.personalDetails?.personal?.age < 16).length,
      FiUser,
      "bg-violet-50 text-violet-600",
    ],
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
