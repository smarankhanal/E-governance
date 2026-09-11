import React from "react";
import { FaPencilAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
export default function ApplicationStatusLink() {
  const navigate = useNavigate();
  return (
    <div
      className="
            group relative flex cursor-pointer flex-col items-center
            justify-center rounded-2xl border border-slate-200
            bg-white px-8 py-10 text-center shadow-sm
            transition-all duration-300
            hover:-translate-y-1 hover:border-[#2F5F98]
            hover:bg-[#2F5F98] hover:shadow-xl
          "
      onClick={() => navigate("/reprint/application")}
    >
      {/* Icon */}
      <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#2F5F98]/10 transition-all duration-300 group-hover:bg-white/20 ">
        <FaPencilAlt className="text-5xl text-[#2F5F98] transition-colors duration-300 group-hover:text-white" />
      </div>

      <p className="text-lg font-bold text-[#2F5F98]  transition-colors duration-300 group-hover:text-white">
        Check Application Status
      </p>
    </div>
  );
}
