import { FiChevronRight } from "react-icons/fi";
export default function ViewAll({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1 rounded-md text-sm font-medium text-[#0e9fb0] hover:text-[#0b7f8d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0e9fb0]"
    >
      View all <FiChevronRight size={14} />
    </button>
  );
}
