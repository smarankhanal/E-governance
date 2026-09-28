import React, { useState } from "react";
import { useFormContext } from "react-hook-form";

import AppointmentStep from "../Appointment/AppointmentStep";
import ServiceTask from "../Appointment/ServiceTask";
import Time from "../Appointment/Time";
import AppointmentSummary from "../Appointment/AppointmentSummary";

import ApplicationStartPopUp from "../../PopUp/ApplicationStartPopup";

export default function AppointmentForm({ onFormNext, onCancel }) {
  const [currentStep, setCurrentStep] = useState(1);

  const [showStartPopup, setShowStartPopup] = useState(false);

  const { trigger } = useFormContext();

  const handleNext = async () => {
    let fieldsToValidate = [];

    if (currentStep === 1) {
      fieldsToValidate = [
        "appointment.province",
        "appointment.district",
        "appointment.location",
      ];
    }

    if (currentStep === 2) {
      fieldsToValidate = [
        "appointment.appointmentDate",
        "appointment.appointmentTime",
      ];
    }

    if (currentStep === 3) {
      setShowStartPopup(true);
      return;
    }

    const isValid = await trigger(fieldsToValidate);

    if (isValid) {
      setCurrentStep((prev) => prev + 1);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleStartApplication = () => {
    setShowStartPopup(false);
    onFormNext();
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
          onFormNext={handleNext}
        />
      )}

      {showStartPopup && (
        <ApplicationStartPopUp
          onClose={() => setShowStartPopup(false)}
          onStart={handleStartApplication}
        />
      )}
    </>
  );
}
