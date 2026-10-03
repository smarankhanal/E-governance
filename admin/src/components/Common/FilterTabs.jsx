export default function FilterTabs({ options, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-1 rounded-lg bg-slate-100 p-1">
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
            value === o
              ? "bg-white text-[#17385f] shadow-sm"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}
