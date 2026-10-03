import { FaClock, FaBuilding } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { PageHeader, PrimaryButton } from "../components";

import { APPOINTMENTS } from "../features/applications/applicationData";

export default function Appointments() {
  const grouped = APPOINTMENTS.reduce((acc, appointment) => {
    (acc[appointment.date] ||= []).push(appointment);
    return acc;
  }, {});

  const dates = Object.keys(grouped).sort();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Appointments"
        subtitle="Manage biometric capture appointments across passport offices."
        action={
          <PrimaryButton icon={FiPlus}>Schedule appointment</PrimaryButton>
        }
      />

      {dates.map((date) => (
        <section key={date}>
          <h2 className="mb-3 text-sm font-semibold text-slate-700">{date}</h2>

          <ul className="divide-y divide-slate-100 overflow-hidden rounded-xl border border-slate-200 bg-white">
            {grouped[date].map((appointment) => (
              <li
                key={appointment.id}
                className="flex flex-wrap items-center gap-4 px-5 py-4 hover:bg-slate-50/70"
              >
                <div className="flex w-28 shrink-0 items-center gap-2 text-sm font-medium text-[#17385f]">
                  <FaClock size={16} className="text-slate-400" />
                  {appointment.time}
                </div>

                <div className="min-w-45 flex-1">
                  <p className="font-medium text-slate-900">
                    {appointment.name}
                  </p>
                  <p className="text-sm text-slate-500">Biometric Capture</p>
                </div>

                <div className="flex w-40 items-center gap-2 text-sm text-slate-600">
                  <FaBuilding size={16} className="text-slate-400" />
                  {appointment.office}
                </div>

                <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                  Confirmed
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
