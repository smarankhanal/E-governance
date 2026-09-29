import React, { useState } from "react";
import { BiSolidUserAccount } from "react-icons/bi";
import AccountBenefitsCard from "../SignInBenefits/AccountBenefitCard";

export default function ApplyWithoutAccount() {
  const [showBenefits, setShowBenefits] = useState(false);

  return (
    <>
      <div
        onClick={() => setShowBenefits(true)}
        className="
          group relative flex cursor-pointer flex-col items-center
          justify-center rounded-2xl border border-slate-200
          bg-white px-8 py-10 text-center shadow-sm
          transition-all duration-300
          hover:-translate-y-1 hover:border-primary
          hover:bg-primary hover:shadow-xl
        "
      >
        {/* Icon */}
        <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 transition-all duration-300 group-hover:bg-white/20 ">
          <BiSolidUserAccount className="text-5xl text-primary transition-colors duration-300 group-hover:text-text-on-primary" />
        </div>

        <p className="text-lg font-bold text-primary  transition-colors duration-300 group-hover:text-text-on-primary">
          Apply without an account
        </p>
      </div>

      {/* Modal overlay */}
      {showBenefits && (
        <div
          onClick={() => setShowBenefits(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
        >
          <div onClick={(e) => e.stopPropagation()}>
            <AccountBenefitsCard onClose={() => setShowBenefits(false)} />
          </div>
        </div>
      )}
    </>
  );
}
