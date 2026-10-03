export default function IconButton({ label, children, onClick }) {
  return (
    <button
      aria-label={label}
      title={label}
      onClick={onClick}
      className="rounded-md p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-[#17385f] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0e9fb0]"
    >
      {children}
    </button>
  );
}
