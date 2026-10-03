import { FaSearch } from "react-icons/fa";

export default function SearchBox({ value, onChange, placeholder }) {
  return (
    <div className="relative w-full sm:w-72">
      <FaSearch
        size={16}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
      />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#0e9fb0] focus:outline-none focus:ring-2 focus:ring-[#0e9fb0]/20"
      />
    </div>
  );
}
