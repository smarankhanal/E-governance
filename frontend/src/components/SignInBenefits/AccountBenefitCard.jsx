import React from "react";
import { FaTimes, FaCheck } from "react-icons/fa";

export default function AccountBenefitsCard({
  onClose,
  onRegister,
  onApplyWithoutAccount,
}) {
  const benefits = [
    "Save and continue applications later",
    "Track submitted applications",
    "Manage appointment bookings",
    "Digital tickets and application history",
    "Receive important updates",
  ];

  return (
    <div className="mx-auto w-full max-w-2xl rounded-xl bg-white p-6">
      {/* Header */}
      <div className="mb-5 flex items-start justify-between">
        <h2 className="text-2xl font-semibold text-blue-900">
          Creating an account allows applicants to:
        </h2>
        <button
          onClick={onClose}
          aria-label="Close"
          className="ml-4 shrink-0 text-2xl text-gray-400 transition hover:text-gray-600"
        >
          <FaTimes />
        </button>
      </div>

      {/* Benefits list */}
      <div className="mb-6 flex flex-col gap-3">
        {benefits.map((benefit) => (
          <div
            key={benefit}
            className="flex items-center gap-3 rounded-lg border border-gray-200 bg-blue-50/40 px-5 py-4"
          >
            <FaCheck className="shrink-0 text-blue-800" />
            <span className="text-lg font-medium text-blue-900">{benefit}</span>
          </div>
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <button
          onClick={onRegister}
          className="flex-1 rounded-lg bg-blue-900 px-6 py-4 text-center text-white transition hover:bg-blue-950"
        >
          Register an account
        </button>
        <button
          onClick={onApplyWithoutAccount}
          className="flex-1 rounded-lg border border-blue-900 bg-white px-6 py-4 text-center text-blue-900 transition hover:bg-blue-50"
        >
          Apply without an account
        </button>
      </div>
    </div>
  );
}
