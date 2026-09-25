import React, { useState } from "react";
import BackButton from "../../Common/Button/BackButton";
import CancelButton from "../../Common/Button/CancelButton";
import NextButton from "../../Common/Button/NextButton";
import PassportRenewal from "../PreviousDocument/PassportRenewal";
import LostStolenPassport from "../PreviousDocument/LostStolenPassport";
import PassportDataCorrection from "../PreviousDocument/PassportDataCorrection";
import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";
import DamagedPassport from "../PreviousDocument/DamagedPassport";

export default function AdditionalDocumentForm({
  onFormBack,
  onFormNext,
  onCancel,
}) {
  const { isValid } = useFormContext();
  const { passportType } = useSelector((state) => state.passport);
  return (
    <div>
      {passportType?.keyword === "RENEWAL" && <PassportRenewal />}

      {passportType?.keyword === "DATA CORRECTION" && (
        <PassportDataCorrection />
      )}
      {passportType?.keyword === "DAMAGED" && <DamagedPassport />}
      {passportType?.keyword === "LOST/STOLEN" && <LostStolenPassport />}
      <div className="mt-16 flex items-center justify-between sm:mt-32">
        <div className="flex gap-6">
          <BackButton onClick={onFormBack} />
          <CancelButton onClick={onCancel} />
        </div>

        <NextButton onClick={onFormNext} disabled={!isValid} />
      </div>
    </div>
  );
}
