import Field from "./Field";
import SwitchRow from "./SwitchRow";

const inputCls =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#0e9fb0] focus:outline-none focus:ring-2 focus:ring-[#0e9fb0]/20";

export default function SystemSettings({ system, on, flip }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Calendar">
          <select
            className={inputCls}
            value={system.calendar}
            onChange={on("system")("calendar")}
          >
            <option>Bikram Sambat (BS)</option>
            <option>Gregorian (AD)</option>
          </select>
        </Field>

        <Field label="Appointment length">
          <select
            className={inputCls}
            value={system.slotMinutes}
            onChange={on("system")("slotMinutes")}
          >
            {["10", "15", "20", "30"].map((m) => (
              <option key={m} value={m}>
                {m} minutes
              </option>
            ))}
          </select>
        </Field>

        <Field label="Opening time">
          <input
            type="time"
            className={inputCls}
            value={system.openTime}
            onChange={on("system")("openTime")}
          />
        </Field>

        <Field label="Closing time">
          <input
            type="time"
            className={inputCls}
            value={system.closeTime}
            onChange={on("system")("closeTime")}
          />
        </Field>

        <Field
          label="Maximum appointments per day"
          hint="Applies to each office unless it sets its own capacity."
        >
          <input
            type="number"
            min="1"
            className={inputCls}
            value={system.maxPerDay}
            onChange={on("system")("maxPerDay")}
          />
        </Field>

        <Field label="Booking window (days ahead)">
          <input
            type="number"
            min="1"
            className={inputCls}
            value={system.bookingWindowDays}
            onChange={on("system")("bookingWindowDays")}
          />
        </Field>
      </div>

      <div className="border-t border-slate-100">
        <SwitchRow
          title="Maintenance mode"
          desc="Applicants can't book or submit while this is on. Staff can still sign in."
          checked={system.maintenance}
          onChange={flip("system", "maintenance")}
        />
      </div>
    </div>
  );
}
