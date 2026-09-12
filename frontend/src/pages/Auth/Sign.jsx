import React from "react";
import { SignupForm } from "../../components";
import PassportImg from "../../assets/images/Passport.png";
import GradientBorderCard from "../../components/Common/GradientBorderBadge";
export default function Sign() {
  return (
    <div className="w-full max-w-4xl mx-auto bg-[#F1F1F1] rounded-2xl">
      <GradientBorderCard>
        <div className="flex flex-col justify-center items-center">
          <div className="mx-auto  flex h-50 w-50 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
            <img
              src={PassportImg}
              alt="Passport"
              className="h-full w-full object-contain"
            />
          </div>

          <p className="text-2xl">Register an account</p>
          <p className="text-gray-500">Please enter your data</p>
        </div>
        <div>
          <SignupForm />
        </div>
      </GradientBorderCard>
    </div>
  );
}
