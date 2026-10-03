export default function PrimaryButton({ icon: Icon, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-lg bg-[#17385f] px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#1d4777] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0e9fb0] focus-visible:ring-offset-2"
    >
      {Icon && <Icon size={16} />}
      {children}
    </button>
  );
}
