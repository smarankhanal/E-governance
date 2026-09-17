import React, { useState } from "react";
import { FaPassport } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { setPassportType } from "../../../store/slice/passportSlice";
const passportTypes = [
  {
    id: "first-issuance",
    en1: "FIRST ISSUANCE",
    en2: "(NEW)",
  },
  {
    id: "renewal",
    en1: "PASSPORT",
    en2: "RENEWAL",
  },
  {
    id: "lost-stolen",
    en1: "PASSPORT",
    en2: "REPLACEMENT",
    en3: "(LOST/STOLEN)",
  },
  {
    id: "damaged",
    en1: "REPLACEMENT",
    en2: "(DAMAGED)",
  },
  {
    id: "modified",
    en1: "MODIFICATION",
    en2: "(DATA CORRECTION)",
  },
];

export default function PassportTypeSelector({ selected }) {
  const dispatch = useDispatch();

  return (
    <>
      <div className="rounded-b-xl border border-t-0 border-slate-200 bg-slate-50/40 px-6 py-8 sm:px-8 sm:py-10 overflow-hidden">
        <div className=" w-full max-w-3xl mx-auto grid grid-cols-1 gap-5 sm:grid-cols-2">
          {passportTypes.map((type, index) => {
            const isSelected = selected?.id === type.id;

            return (
              <button
                key={type.id}
                type="button"
                onClick={() => dispatch(setPassportType(type))}
                className={`
                    group flex min-h-37.5 items-center gap-5
                    rounded-xl border px-6 py-6 text-left
                   

                   ${
                     index === passportTypes.length - 1
                       ? "sm:col-span-2 sm:justify-self-center"
                       : ""
                   }

                    ${
                      isSelected
                        ? "border-[#2f5f98] bg-[#e9f2fb] shadow-[0_4px_15px_rgba(47,95,152,0.12)]"
                        : "border-slate-200 bg-white hover:border-[#2f5f98] hover:bg-[#2f5f98] hover:shadow-md"
                    }
                  `}
              >
                {/* Icon */}
                <div
                  className={`
                      flex h-16 w-16 shrink-0 items-center justify-center
                      rounded-xl transition-all duration-200

                      ${
                        isSelected
                          ? "bg-[#2f5f98] text-white"
                          : "bg-[#eef4f9] text-[#2f5f98] group-hover:bg-[#2f5f98] group-hover:text-white"
                      }
                    `}
                >
                  <FaPassport className="text-3xl" />
                </div>

                {/* Text */}
                <div className="flex flex-col">
                  <span
                    className={`
                        text-lg font-bold leading-tight tracking-wide
                        transition-colors duration-200

                        ${
                          isSelected
                            ? "text-[#2f5f98]"
                            : "text-[#495057] group-hover:text-white"
                        }
                      `}
                  >
                    {type.en1}
                  </span>

                  <span
                    className={`
                        text-lg font-bold 
                        transition-colors duration-200

                        ${
                          isSelected
                            ? "text-[#2f5f98]"
                            : "text-[#495057] group-hover:text-white"
                        }
                      `}
                  >
                    {type.en2}
                  </span>

                  {type.en3 && (
                    <span
                      className={`
                          text-lg font-bold 
                          transition-colors duration-200

                          ${
                            isSelected
                              ? "text-[#2f5f98]"
                              : "text-[#495057] group-hover:text-white"
                          }
                        `}
                    >
                      {type.en3}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
