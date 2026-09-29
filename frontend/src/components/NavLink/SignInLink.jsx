import React from "react";
import { FaUserCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
export default function SignInLink() {
  const navigate = useNavigate();
  return (
    <div
      className="
            group relative flex cursor-pointer flex-col items-center
            justify-center rounded-2xl border border-slate-200
            bg-white px-8 py-10 text-center shadow-sm
            transition-all duration-300
            hover:-translate-y-1 hover:border-primary
            hover:bg-primary hover:shadow-xl
          "
      onClick={() => navigate("/account/SignIn")}
    >
      {/* Icon */}
      <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 transition-all duration-300 group-hover:bg-white/20 ">
        <FaUserCheck className="text-5xl text-primary transition-colors duration-300 group-hover:text-text-on-primary" />
      </div>

      <p className="text-lg font-bold text-primary  transition-colors duration-300 group-hover:text-text-on-primary">
        Sign in
      </p>
    </div>
  );
}
