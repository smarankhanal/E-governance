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
      /*
       * Don't directly move to the next
       * main form step.
       *
       * Show the 15-minute popup first.
       */
      setShowStartPopup(true);
      return;
    }

    const isValid = await trigger(fieldsToValidate);

    if (isValid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleStartApplication = () => {
    setShowStartPopup(false);

    /*
     * This moves PassportForm from
     * AppointmentForm to DemographicForm.
     *
     * PassportForm will start the timer
     * inside its onFormNext handler.
     */
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
