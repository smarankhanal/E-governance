import React from "react";

export default function PassportForm({ steps, currentStep }) {
  return (
    <div className="w-full px-2 py-4 sm:px-4 sm:py-6">
      <div className="flex w-full items-start">
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isLast = index === steps.length - 1;

          return (
            <React.Fragment key={label}>
              <div className="flex min-w-0 flex-1 flex-col items-center">
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
                        ? "border-step-active text-black"
                        : "border-border-muted bg-transparent text-border-muted"
                    }
                  `}
                >
                  {stepNumber}
                </div>

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
                        ? "font-semibold text-text-dark"
                        : "font-normal text-text-placeholder"
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
                    bg-border-divider 
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
