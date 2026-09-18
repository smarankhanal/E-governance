import React from "react";

export default function PassportForm() {
  const steps = [
    "Book an appointment",
    "Demographic data",
    "Previous document",
    "Supporting documents",
    "Summary",
  ];

  const currentStep = 1;

  return (
    <div className="w-full px-2 py-4 sm:px-4 sm:py-6">
      <div className="flex w-full items-start">
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber <= currentStep;
          const isLast = index === steps.length - 1;

          return (
            <React.Fragment key={label}>
              {/* Step */}
              <div className="flex min-w-0 flex-1 flex-col items-center">
                {/* Step Circle */}
                <div
                  className={`
                    flex shrink-0
                    h-7 w-7 sm:h-8.5 sm:w-8.5
                    items-center justify-center
                    rounded-full border-[1.5px]
                    font-serif
                    text-xs sm:text-[15px]

                    ${
                      isActive
                        ? "border-[#1c3f5e]  text-black"
                        : "border-[#c7ccd1] bg-transparent text-[#c7ccd1]"
                    }
                  `}
                >
                  {stepNumber}
                </div>

                {/* Step Label */}
                <span
                  className={`
                    mt-2
                    w-full
                    text-center
                    font-serif
                    text-[10px]
                    leading-tight
                    sm:mt-2.5 sm:text-[15px]

                    ${
                      isActive
                        ? "font-semibold text-[#1c1c1c]"
                        : "font-normal text-[#9aa1a8]"
                    }
                  `}
                >
                  {label}
                </span>
              </div>

              {!isLast && (
                <div
                  className="
                    mx-1
                    mt-3.5
                    h-px
                    flex-1
                    bg-[#dcdfe3]
                    sm:mx-2
                    sm:mt-4.25
                  "
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
