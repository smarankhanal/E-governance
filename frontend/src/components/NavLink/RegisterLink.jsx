import React from "react";
import { GiArchiveRegister } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

export default function RegisterLink() {
  const navigate = useNavigate();
  return (
    <div
      className="group relative flex cursor-pointer flex-col items-center justify-center rounded-xl border border-blue-200 bg-[#2F5F98] px-6 py-8 text-center shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg"
      onClick={() => navigate("/account/Register")}
    >
      {/* Recommended badge */}
      <span className="absolute right-4 top-1 rounded-full bg-white px-3 py-1 text-[11px] font-bold uppercase  text-[#2F5F98] shadow-sm">
        Recommended
      </span>

      {/* Icon */}
      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/15">
        <GiArchiveRegister className="text-4xl text-white" />
      </div>

      {/* Title */}
      <p className="text-lg font-bold text-white">Register an account</p>
    </div>
  );
}
