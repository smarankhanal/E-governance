import { FiEdit2, FiTrash2, FiEye, FiMail, FiPhone } from "react-icons/fi";

import {
  Badge,
  IconButton,
  STATUS_STYLES,
  TYPE_STYLES,
  applicationType,
  fullName,
  initials,
  toInputDate,
} from "../../features/applications/applicationUtils/applicationUi";

export default function ApplicationsTable({
  rows,
  total,
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-225 text-left text-sm">
          <thead className="bg-slate-50 text-xs font-medium text-slate-500">
            <tr>
              <th className="px-6 py-3">Applicant</th>
              <th className="px-6 py-3">Type</th>
              <th className="px-6 py-3">Office</th>
              <th className="px-6 py-3">Appointment</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {rows.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-12 text-center text-slate-500"
                >
                  No applications match your search. Try a different name or
                  type.
                </td>
              </tr>
            )}

            {rows.map((application) => {
              const name = fullName(application);
              const type = applicationType(application);

              return (
                <tr key={application.id} className="hover:bg-slate-50/70">
                  <td className="px-6 py-4">
                    <button
                      onClick={() => onView(application)}
                      className="flex items-center gap-3 rounded-md text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0e9fb0]"
                    >
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#0e9fb0] text-sm font-semibold text-white">
                        {initials(name)}
                      </div>

                      <div>
                        <p className="font-medium text-slate-900">{name}</p>

                        <p className="flex items-center gap-1 text-slate-500">
                          <FiMail size={12} />
                          {application.contact.email || "—"}
                        </p>

                        <p className="flex items-center gap-1 text-slate-500">
                          <FiPhone size={12} />
                          {application.contact.phoneNumber || "—"}
                        </p>
                      </div>
                    </button>
                  </td>

                  <td className="px-6 py-4">
                    <Badge className={TYPE_STYLES[type]}>{type}</Badge>
                  </td>

                  <td className="px-6 py-4 text-slate-600">
                    <p>{application.appointment.locationName || "—"}</p>

                    <p className="text-slate-500">
                      {application.appointment.districtName || "—"}
                    </p>
                  </td>

                  <td className="px-6 py-4 text-slate-600">
                    <p>
                      {toInputDate(application.appointment.appointmentDate) ||
                        "—"}
                    </p>

                    <p className="text-slate-500">
                      {application.appointment.appointmentTime || "—"}
                    </p>
                  </td>

                  <td className="px-6 py-4">
                    <Badge className={STATUS_STYLES[application.status]}>
                      {application.status}
                    </Badge>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-1">
                      <IconButton
                        label={`View ${name}`}
                        onClick={() => onView(application)}
                      >
                        <FiEye size={16} />
                      </IconButton>

                      <IconButton
                        label={`Edit ${name}`}
                        onClick={() => onEdit(application)}
                      >
                        <FiEdit2 size={16} />
                      </IconButton>

                      <IconButton
                        label={`Delete ${name}`}
                        danger
                        onClick={() => onDelete(application)}
                      >
                        <FiTrash2 size={16} />
                      </IconButton>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="border-t border-slate-200 px-6 py-3 text-sm text-slate-500">
        Showing {rows.length} of {total} applications
      </div>
    </div>
  );
}
