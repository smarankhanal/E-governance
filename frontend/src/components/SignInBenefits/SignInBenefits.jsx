import React from "react";
import SingleSignInBenefits from "./SingleSignInBenefits";

export default function SignInBenefits() {
  const lists = [
    "Save and continue applications later",
    "Track submitted applications",
    "Manage appointment bookings",
    "Digital tickets and application history",
    "Receive important updates",
  ];

  return (
    <div className="w-full max-w-7xl mx-auto bg-surface-page-light  rounded-2xl border border-border-page-light shadow-md p-4">
      {/* Heading */}

      <p className="text-center text-xl font-bold text-primary sm:text-2xl p-2">
        Creating an account allows applicants to:
      </p>

      {/* Benefits */}
      <div className="space-y-3 flex flex-wrap gap-2">
        {lists.map((list, index) => (
          <SingleSignInBenefits key={index} text={list} />
        ))}
      </div>
    </div>
  );
}
