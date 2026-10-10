import { FiUsers, FiUserPlus } from "react-icons/fi";

export default function StaffTable({ activeRole, staff, onAdd }) {
  const roleLabel = activeRole === "admin" ? "Administrators" : "Verifiers";

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-5 py-4">
        <h2 className="font-semibold text-[#17385f]">{roleLabel}</h2>

        <p className="mt-1 text-sm text-slate-500">
          Accounts assigned to this role.
        </p>
      </div>

      {staff.length === 0 ? (
        <div className="flex flex-col items-center px-5 py-14 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
            <FiUsers size={26} />
          </div>

          <h3 className="font-semibold text-slate-800">
            No {activeRole === "admin" ? "administrators" : "verifiers"} yet
          </h3>

          <p className="mt-2 max-w-sm text-sm text-slate-500">
            Add a staff account to get started.
          </p>

          <button
            type="button"
            onClick={onAdd}
            className="mt-5 flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-[#17385f] hover:bg-slate-50"
          >
            <FiUserPlus size={16} />
            Add staff
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-4 font-semibold">Staff member</th>
                <th className="px-5 py-4 font-semibold">Email</th>
                <th className="px-5 py-4 font-semibold">Role</th>
                <th className="px-5 py-4 font-semibold">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {staff.map((member) => (
                <tr key={member.id} className="hover:bg-slate-50">
                  <td className="whitespace-nowrap px-5 py-4 font-medium text-slate-800">
                    {member.name}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-slate-600">
                    {member.email}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 capitalize text-slate-600">
                    {member.role}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4">
                    <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
                      {member.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
