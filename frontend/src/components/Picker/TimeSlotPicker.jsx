import React, { useState } from "react";

const timeSlots = {
  AM: ["09:00:00", "09:40:00", "10:20:00", "11:00:00", "11:40:00"],
  PM: ["13:00:00", "13:40:00", "14:20:00", "15:00:00", "15:40:00"],
};

export default function TimeSlotPicker({ value, onChange }) {
  const [period, setPeriod] = useState("AM");

  const handleTimeSelect = (time) => {
    onChange(time);
  };

  return (
    <div className="w-full">
      {/* AM / PM */}
      <div className="flex justify-center gap-6">
        <button
          type="button"
          onClick={() => setPeriod("AM")}
          className={`
            h-20 w-28 rounded-lg border-2
            font-serif text-xl
            transition-all duration-200
            ${
              period === "AM"
                ? "border-[#2F5F98] bg-[#eaf2fb] text-[#2F5F98]"
                : "border-[#2F5F98] bg-white text-[#294e78]"
            }
          `}
        >
          AM
        </button>

        <button
          type="button"
          onClick={() => setPeriod("PM")}
          className={`
            h-20 w-28 rounded-lg border-2
            font-serif text-xl
            transition-all duration-200
            ${
              period === "PM"
                ? "border-[#2F5F98] bg-[#eaf2fb] text-[#2F5F98]"
                : "border-[#2F5F98] bg-white text-[#294e78]"
            }
          `}
        >
          PM
        </button>
      </div>

      {/* Time slots */}
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {timeSlots[period].map((time) => {
          const isSelected = value === time;

          return (
            <button
              key={time}
              type="button"
              onClick={() => handleTimeSelect(time)}
              className={`
                h-16 rounded-lg border-2
                font-serif text-lg
                transition-all duration-200
                ${
                  isSelected
                    ? "border-[#2F5F98] bg-[#2F5F98] text-white"
                    : "border-[#2F5F98] bg-white text-[#294e78] hover:bg-[#eaf2fb]"
                }
              `}
            >
              {time}
            </button>
          );
        })}
      </div>
    </div>
  );
}
