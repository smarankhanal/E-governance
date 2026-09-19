import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "react-hook-form";

import AppointmentStep from "../Appointment/AppointmentStep";
import ServiceTask from "../Appointment/ServiceTask";
import Time from "../Appointment/Time";
import AppointmentSummary from "../Appointment/AppointmentSummary";
import CancelPopUp from "../../PopUp/CancelPopUp";

export default function AppointmentForm({ onFormNext }) {
  const navigate = useNavigate();
  const { trigger } = useFormContext();

  const [currentStep, setCurrentStep] = useState(1);
  const [showCancelPopup, setShowCancelPopup] = useState(false);

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
      <AppointmentStep currentStep={currentStep} />

      {currentStep === 1 && (
        <ServiceTask onNext={handleNext} onCancel={handleCancel} />
      )}

      {currentStep === 2 && (
        <Time onNext={handleNext} onBack={handleBack} onCancel={handleCancel} />
      )}

      {currentStep === 3 && (
        <AppointmentSummary
          onBack={handleBack}
          onCancel={handleCancel}
          onFormNext={onFormNext}
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
