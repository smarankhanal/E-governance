import React from "react";
import { LuArrowRight } from "react-icons/lu";

export default function NextButton({
  disabled = false,
  className = "",
  ...props
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={`
        flex items-center gap-1
        font-serif text-lg
        transition-colors duration-200
        sm:text-xl
        ${
          disabled
            ? "cursor-not-allowed text-gray-400"
            : "cursor-pointer text-[#2f5f98] hover:text-[#244a78]"
        }
        ${className}
      `}
      {...props}
    >
      Next
      <LuArrowRight className="h-6 w-6" />
    </button>
  );
}
