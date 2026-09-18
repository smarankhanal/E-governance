import React from "react";
import { MdChevronRight } from "react-icons/md";

export default function AppointmentStep({ currentStep }) {
  const steps = ["Service task", "Time", "Appointment summary"];

  return (
    <div className="w-full px-2 py-4 sm:px-4">
      {/* ================= Step Navigation ================= */}
      <div className="flex w-full items-center rounded-lg border border-[#e1e5e9] px-4 py-4 sm:px-8">
        {steps.map((step, index) => {
          const stepNumber = index + 1;

          // Check whether this is the current step
          const isActive = stepNumber === currentStep;

          return (
            <React.Fragment key={step}>
              <div
                className={`
                  flex items-center gap-1
                  font-serif text-sm sm:text-lg
                  ${isActive ? "text-[#597fad]" : "text-[#6f747a]"}
                `}
              >
                {/* Chevron before each step */}
                <MdChevronRight className="h-6 w-6 shrink-0 sm:h-7 sm:w-7" />

                {/* Active step gets an underline */}
                <span
                  className={`
                    ${isActive ? "border-b-2 border-[#597fad] pb-1" : ""}
                  `}
                >
                  {step}
                </span>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
