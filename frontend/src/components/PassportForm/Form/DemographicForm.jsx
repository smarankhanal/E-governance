import React, { useState } from "react";
import DemographicStep from "../DemographicData/DemographicStep";
import PersonalDetails from "../DemographicData/PersonalDetails";
import ContactDetails from "../DemographicData/ContactDetails";
import AddressDetails from "../DemographicData/AddressDetails";
import ProxyDetails from "../DemographicData/ProxyDetails";

export default function DemographicForm({ onFormNext, onFormBack, onCancel }) {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  return (
    <>
      <DemographicStep currentStep={currentStep} />

      {currentStep === 1 && (
        <PersonalDetails
          onNext={handleNext}
          onCancel={onCancel}
          onFormBack={onFormBack}
        />
      )}

      {currentStep === 2 && (
        <ContactDetails
          onNext={handleNext}
          onBack={handleBack}
          onCancel={onCancel}
        />
      )}

      {currentStep === 3 && (
        <AddressDetails
          onNext={handleNext}
          onBack={handleBack}
          onCancel={onCancel}
        />
      )}

      {currentStep === 4 && (
        <ProxyDetails
          onFormNext={onFormNext}
          onBack={handleBack}
          onCancel={onCancel}
        />
      )}
    </>
  );
}
