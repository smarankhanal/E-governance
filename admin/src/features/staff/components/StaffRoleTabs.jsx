import { STAFF_ROLES } from "../config/staffConfig";

export default function StaffRoleTabs({
  activeRole,
  onRoleChange,
  getRoleCount,
}) {
  return (
    <div className="mb-5 flex gap-2 border-b border-slate-200">
      {STAFF_ROLES.map((item) => {
        const Icon = item.icon;
        const selected = activeRole === item.id;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onRoleChange(item.id)}
            aria-pressed={selected}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition ${
              selected
                ? "border-[#0e9fb0] text-[#17385f]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Icon size={17} />
            {item.label}s
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs">
              {getRoleCount(item.id)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
