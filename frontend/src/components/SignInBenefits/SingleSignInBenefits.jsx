import React from "react";
import { FaCheck } from "react-icons/fa6";

export default function SingleSignInBenefits({
  text = "Save and continue applications later",
}) {
  return (
    <div className="flex flex-nowrap items-center gap-3 rounded-2xl bg-white p-4 border border-slate-200/80 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] max-w-lg">
      <FaCheck className="text-[#2F5F98] sm:text-lg text-sm" />
      <span className="font-serif sm:text-lg text-sm font-semibold text-[#2F5F98]">
        {text}
      </span>
    </div>
  );
}
