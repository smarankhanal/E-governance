import React, { useState } from "react";
import BackButton from "../../Common/Button/BackButton";
import CancelButton from "../../Common/Button/CancelButton";
import NextButton from "../../Common/Button/NextButton";

export default function AdditionalDocumentForm({
  onFormBack,
  onFormNext,
  onCancel,
}) {
  return (
    <div>
      <div className="mt-16 flex items-center justify-between sm:mt-32">
        <div className="flex gap-6">
          <BackButton onClick={onFormBack} />
          <CancelButton onClick={onCancel} />
        </div>

        <NextButton onClick={onFormNext} />
      </div>
    </div>
  );
}
