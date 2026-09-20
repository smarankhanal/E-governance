import React, { useState } from "react";
import DemographicStep from "../DemographicData/DemographicStep";
import PersonalDetails from "../DemographicData/PersonalDetails";
import ContactDetails from "../DemographicData/ContactDetails";
import AddressDetails from "../DemographicData/AddressDetails";
import ProxyDetails from "../DemographicData/ProxyDetails";
import CancelPopUp from "../../PopUp/CancelPopUp";

export default function DemographicForm({ onFormNext, onFormBack }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [showCancelPopup, setShowCancelPopup] = useState(false);

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };
  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };
  const handleCancel = () => {
    setShowCancelPopup(true);
  };

  const handleClosePopup = () => {
    setShowCancelPopup(false);
  };

  const handleConfirmCancel = () => {
    setShowCancelPopup(false);
    navigate("/application/pre-enrollment-home");
  };
  return (
    <>
      <DemographicStep currentStep={currentStep} />
      {currentStep === 1 && (
        <PersonalDetails
          onNext={handleNext}
          onCancel={handleCancel}
          onFormBack={onFormBack}
        />
      )}
      {currentStep === 2 && (
        <ContactDetails
          onNext={handleNext}
          onBack={handleBack}
          onCancel={handleCancel}
        />
      )}
      {currentStep === 3 && (
        <AddressDetails
          onNext={handleNext}
          onBack={handleBack}
          onCancel={handleCancel}
        />
      )}
      {currentStep === 4 && (
        <ProxyDetails
          onFormNext={onFormNext}
          onBack={handleBack}
          onCancel={handleCancel}
        />
      )}

      {showCancelPopup && (
        <CancelPopUp
          handleClosePopup={handleClosePopup}
          handleConfirmCancel={handleConfirmCancel}
        />
      )}
    </>
  );
}
