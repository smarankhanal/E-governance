export default function LoginInput({
  id,
  label,
  type = "text",
  icon: Icon,
  value,
  onChange,
  placeholder,
  autoComplete,
  rightElement,
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-semibold text-slate-700"
      >
        {label}
      </label>

      <div className="relative">
        {Icon && (
          <Icon
            size={18}
            aria-hidden="true"
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
        )}

        <input
          id={id}
          name={id}
          type={type}
          autoComplete={autoComplete}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required
          className={`w-full rounded-xl border border-slate-200 bg-white py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#0e9fb0] focus:ring-4 focus:ring-[#0e9fb0]/10 ${
            Icon ? "pl-11" : "pl-4"
          } ${rightElement ? "pr-12" : "pr-4"}`}
        />

        {rightElement && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
            {rightElement}
          </div>
        )}
      </div>
    </div>
  );
}
