import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import AppointmentStep from "../Appointment/AppointmentStep";
import ServiceTask from "../Appointment/ServiceTask";
import Time from "../Appointment/Time";
import CancelPopUp from "../../PopUp/CancelPopUp";
import AppointmentSummary from "../Appointment/AppointmentSummary";

export default function AppointmentForm() {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [showCancelPopup, setShowCancelPopup] = useState(false);

  // =========================
  // Next
  // =========================
  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  // =========================
  // Back
  // =========================
  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  // =========================
  // Cancel button
  // =========================
  const handleCancel = () => {
    setShowCancelPopup(true);
  };

  // =========================
  // Confirm cancellation
  // =========================
  const handleConfirmCancel = () => {
    // Clear appointment data
    setCurrentStep(1);

    // If you have localStorage data, clear it here
    localStorage.removeItem("appointment");

    // If you have other appointment-related data:
    // localStorage.removeItem("appointmentDate");
    // localStorage.removeItem("appointmentTime");
    // localStorage.removeItem("appointmentLocation");

    setShowCancelPopup(false);

    // Navigate back to pre-integrated enrollment
    navigate("/application/pre-enrollment-home");
  };

  const handleClosePopup = () => {
    setShowCancelPopup(false);
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
          onNext={handleNext}
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
