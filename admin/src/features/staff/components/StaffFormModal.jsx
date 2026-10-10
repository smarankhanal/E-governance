import { FiX } from "react-icons/fi";
import { STAFF_ROLES } from "../config/staffConfig";

export default function StaffFormModal({
  open,
  form,
  error,
  onClose,
  onChange,
  onSubmit,
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="staff-modal-title"
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
      >
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2
              id="staff-modal-title"
              className="text-xl font-bold text-[#17385f]"
            >
              Add Staff Account
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Enter the details for the new staff member.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
          >
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="staff-name"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Full name
            </label>

            <input
              id="staff-name"
              name="name"
              type="text"
              required
              maxLength={100}
              autoComplete="name"
              value={form.name}
              onChange={(event) => onChange("name", event.target.value)}
              placeholder="Enter full name"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#0e9fb0] focus:ring-4 focus:ring-[#0e9fb0]/10"
            />
          </div>

          <div>
            <label
              htmlFor="staff-email"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Official email
            </label>

            <input
              id="staff-email"
              name="email"
              type="email"
              required
              maxLength={254}
              autoComplete="email"
              value={form.email}
              onChange={(event) => onChange("email", event.target.value)}
              placeholder="name@department.gov.np"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#0e9fb0] focus:ring-4 focus:ring-[#0e9fb0]/10"
            />
          </div>

          <div>
            <label
              htmlFor="staff-role"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Account role
            </label>

            <select
              id="staff-role"
              name="role"
              value={form.role}
              onChange={(event) => onChange("role", event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#0e9fb0] focus:ring-4 focus:ring-[#0e9fb0]/10"
            >
              {STAFF_ROLES.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          {error && (
            <p role="alert" className="text-sm text-rose-600">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-[#17385f] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#214a78]"
            >
              Add account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
