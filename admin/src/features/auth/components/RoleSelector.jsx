import { ROLES } from "../config/authConfig";

export default function RoleSelector({ role, onRoleChange }) {
  return (
    <div className="mb-7">
      <p className="mb-3 text-sm font-semibold text-slate-700">Sign in as</p>

      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {ROLES.map((item) => {
          const Icon = item.icon;
          const selected = role === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onRoleChange(item.id)}
              aria-pressed={selected}
              className={`relative flex min-h-28 flex-col items-center justify-center rounded-xl border p-2 text-center transition sm:p-3 ${
                selected
                  ? "border-[#0e9fb0] bg-[#0e9fb0]/5 ring-2 ring-[#0e9fb0]/15"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <Icon
                size={22}
                aria-hidden="true"
                className={selected ? "text-[#0e9fb0]" : "text-slate-500"}
              />

              <span
                className={`mt-2 text-xs font-bold sm:text-sm ${
                  selected ? "text-[#17385f]" : "text-slate-700"
                }`}
              >
                {item.label}
              </span>

              <span className="mt-1 text-[10px] leading-4 text-slate-500 sm:text-xs">
                {item.description}
              </span>

              {selected && (
                <span
                  aria-hidden="true"
                  className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#0e9fb0]"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
