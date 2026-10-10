import { FiUserPlus } from "react-icons/fi";

export default function StaffHeader({ activeRole, onAdd }) {
  const roleLabel = activeRole === "admin" ? "Admin" : "Verifier";

  return (
    <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <p className="mb-1 text-sm font-semibold text-[#0e9fb0]">
          ACCESS CONTROL
        </p>

        <h1 className="text-2xl font-bold text-[#17385f] sm:text-3xl">
          Staff Management
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Manage administrator and document verifier accounts.
        </p>
      </div>

      <button
        type="button"
        onClick={onAdd}
        className="flex items-center justify-center gap-2 rounded-xl bg-[#17385f] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#214a78]"
      >
        <FiUserPlus size={18} />
        Add {roleLabel}
      </button>
    </div>
  );
}
