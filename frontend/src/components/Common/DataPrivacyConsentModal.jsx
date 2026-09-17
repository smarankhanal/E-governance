import React from "react";
import { FiX } from "react-icons/fi";
import { BsFileEarmarkCheck } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function DataPrivacyConsentModal({
  open = true,
  onAgree,
  onRefuse,
  onClose,
}) {
  const navigate = useNavigate();

  const handleOnAgree = () => {
    onAgree();
    navigate("/application/integrated-enrollment");
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="relative w-full max-w-md rounded-lg bg-white shadow-xl">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 text-slate-500 hover:text-slate-700 transition-colors"
        >
          <FiX size={22} />
        </button>

        <div className="px-8 pb-8 pt-12 text-center">
          {/* Title */}
          <h2 className="font-serif text-2xl font-bold tracking-wide text-slate-800">
            DATA PRIVACY CONSENT
          </h2>

          {/* Icon */}
          <div className="my-6 flex justify-center">
            <BsFileEarmarkCheck size={52} className="text-slate-700" />
          </div>

          {/* Body text */}
          <p className="text-slate-600">
            I acknowledge that I have read and agreed to the presented Terms and
            Conditions.
          </p>

          {/* Actions */}
          <div className="mt-8 flex items-center justify-center gap-6">
            <button onClick={onRefuse} className="font-medium text-[#2c6ecb] ">
              I refuse
            </button>
            <button
              onClick={handleOnAgree}
              className="rounded-md bg-[#2c4a6e] px-8 py-2.5 font-medium text-white transition-colors hover:bg-[#243d5b]"
            >
              I agree
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
