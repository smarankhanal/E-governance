export default function ApplicationIconButton({
  label,
  onClick,
  danger = false,
  children,
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={`rounded-md p-2 text-slate-500 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0e9fb0] ${
        danger
          ? "hover:bg-rose-50 hover:text-rose-600"
          : "hover:bg-slate-100 hover:text-[#17385f]"
      }`}
    >
      {children}{" "}
    </button>
  );
}
