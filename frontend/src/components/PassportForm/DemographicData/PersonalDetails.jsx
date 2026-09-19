import React from "react";
import PersonalInfo from "./PersonalDetails/PersonalInfo";
import ParentalDetails from "./PersonalDetails/ParentalDetails";
import CitizenshipDetails from "./PersonalDetails/CitizenShipDetails";
import CancelButton from "../../Common/Button/CancelButton";
import NextButton from "../../Common/Button/NextButton";

export default function PersonalDetails({ onNext, onCancel }) {
  return (
    <div className="w-full px-4 py-6 sm:px-8">
      <PersonalInfo />
      <CitizenshipDetails />
      <ParentalDetails />
      <div className="mt-16 flex items-center justify-between sm:mt-32">
        <CancelButton onClick={onCancel} />

        <NextButton onClick={onNext} />
      </div>
    </div>
  );
}
