import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import {
  StepIndicator,
  AppointmentForm,
  DemographicForm,
  DocumentForm,
  AdditionalDocumentForm,
  Summary,
} from "../components";
export default function PassportForm() {
  const [currentStep, setCurrentStep] = useState(1);

  const methods = useForm({
    mode: "onBlur",
    defaultValues: {
      province: "",
      district: "",
      location: "",
      appointmentDate: null,
      appointmentTime: "",
      contact: "",
      email: "",

      givenName: "",
      surname: "",
      dateOfBirth: "",
      gender: "",
      nationality: "",
      nin: "",

      citizenship: null,
      photo: null,

      additionalDocuments: [],
    },
  });

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmitApplication = (data) => {
    console.log("Complete application:", data);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleSubmitApplication)}
        className="mx-auto w-full max-w-4xl shadow-lg"
      >
        <StepIndicator currentStep={currentStep} />

        {currentStep === 1 && <AppointmentForm onFormNext={handleNext} />}

        {currentStep === 2 && (
          <DemographicForm onFormNext={handleNext} onFormBack={handleBack} />
        )}

        {currentStep === 3 && (
          <DocumentForm onFormNext={handleNext} onFormBack={handleBack} />
        )}

        {currentStep === 4 && (
          <AdditionalDocumentForm
            onFormNext={handleNext}
            onFormBack={handleBack}
          />
        )}

        {currentStep === 5 && <Summary onFormBack={handleBack} />}
      </form>
    </FormProvider>
  );
}
