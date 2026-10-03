import {
  FaCheckCircle,
  FaClock,
  FaCalendarAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { IconButton } from "../../components";

export default function PassportCollectionTable({
  passports,
  onMarkCollected,
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-262.5">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Applicant
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Application ID
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Passport Number
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Type
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Office
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Collection Date
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Status
              </th>

              <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {passports.map((passport) => (
              <tr key={passport.id} className="transition hover:bg-slate-50/70">
                <td className="px-5 py-4">
                  <p className="font-medium text-slate-900">{passport.name}</p>

                  <p className="mt-0.5 text-xs text-slate-500">
                    Ready: {passport.readyDate}
                  </p>
                </td>

                <td className="px-5 py-4 text-sm font-medium text-[#17385f]">
                  {passport.applicationId}
                </td>

                <td className="px-5 py-4 text-sm text-slate-600">
                  {passport.passportNumber}
                </td>

                <td className="px-5 py-4">
                  <span className="rounded-md bg-[#eaf2fb] px-2.5 py-1 text-xs font-medium text-[#2F5F98]">
                    {passport.passportType}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <FaMapMarkerAlt size={14} className="text-slate-400" />

                    {passport.office}
                  </div>
                </td>

                <td className="px-5 py-4">
                  {passport.collectionDate ? (
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <FaCalendarAlt size={14} className="text-slate-400" />

                      {passport.collectionDate}
                    </div>
                  ) : (
                    <span className="text-sm text-slate-400">
                      Not collected
                    </span>
                  )}
                </td>

                <td className="px-5 py-4">
                  {passport.status === "Collected" ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                      <FaCheckCircle size={12} />
                      Collected
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                      <FaClock size={12} />
                      Not Collected
                    </span>
                  )}
                </td>

                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-2">
                    {passport.status === "Not Collected" && (
                      <button
                        onClick={() => onMarkCollected(passport.id)}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-[#2F5F98] px-3 py-2 text-xs font-medium text-white transition hover:bg-[#244a78]"
                      >
                        <FaCheckCircle size={13} />
                        Mark as Collected
                      </button>
                    )}

                    <IconButton label="View details">
                      <FiEye size={16} />
                    </IconButton>
                  </div>
                </td>
              </tr>
            ))}

            {passports.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="px-5 py-12 text-center text-sm text-slate-500"
                >
                  No passports found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
