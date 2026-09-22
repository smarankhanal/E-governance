import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import AppointmentStep from "../Appointment/AppointmentStep";
import ServiceTask from "../Appointment/ServiceTask";
import Time from "../Appointment/Time";
import AppointmentSummary from "../Appointment/AppointmentSummary";

export default function AppointmentForm({ onFormNext, onCancel }) {
  const [currentStep, setCurrentStep] = useState(1);
  const { trigger } = useFormContext();
  const handleNext = async () => {
    let fieldsToValidate = [];

    if (currentStep === 1) {
      fieldsToValidate = ["province", "district", "location"];
    }

    if (currentStep === 2) {
      fieldsToValidate = ["appointmentDate", "appointmentTime"];
    }

    if (currentStep === 3) {
      return;
    }

    const isValid = await trigger(fieldsToValidate);

    if (isValid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  return (
    <>
      <AppointmentStep currentStep={currentStep} />

      {currentStep === 1 && (
        <ServiceTask onNext={handleNext} onCancel={onCancel} />
      )}

      {currentStep === 2 && (
        <Time onNext={handleNext} onBack={handleBack} onCancel={onCancel} />
      )}

      {currentStep === 3 && (
        <AppointmentSummary
          onBack={handleBack}
          onCancel={onCancel}
          onFormNext={onFormNext}
        />
      )}
    </>
  );
}
