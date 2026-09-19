import React from "react";
import BackButton from "../../Common/Button/BackButton";
import CancelButton from "../../Common/Button/CancelButton";
import NextButton from "../../Common/Button/NextButton";
export default function ProxyDetails({ onBack, onCancel, onNext }) {
  return (
    <div className="w-full px-2 py-4 sm:px-4">
      <div className="mt-16 flex items-center justify-between sm:mt-32">
        <div className="flex gap-6">
          <BackButton onClick={onBack} />

          <CancelButton onClick={onCancel} />
        </div>

        <NextButton onClick={onNext} />
      </div>
    </div>
  );
}
