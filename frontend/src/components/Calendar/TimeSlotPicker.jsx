import React from "react";

const defaultTimeSlots = [
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
];

export default function TimeSlotPicker({
  label = "Select appointment time",
  value,
  onChange,
  timeSlots = defaultTimeSlots,
  disabledSlots = [],
  error,
  required = false,
}) {
  return (
    <div className="flex w-full flex-col gap-3">
      <label className="text-lg font-medium text-[#495070]">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {timeSlots.map((time) => {
          const isSelected = value === time;
          const isDisabled = disabledSlots.includes(time);

          return (
            <button
              key={time}
              type="button"
              disabled={isDisabled}
              onClick={() => onChange(time)}
              className={`rounded-lg border px-4 py-3 text-sm font-medium transition-all duration-200 ${
                isDisabled
                  ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400"
                  : isSelected
                    ? "border-[#2F5F98] bg-[#2F5F98] text-white shadow-sm"
                    : "border-slate-200 bg-white text-[#495057] hover:border-[#009DAC] hover:bg-[#009DAC]/5"
              }`}
            >
              {time}
            </button>
          );
        })}
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
