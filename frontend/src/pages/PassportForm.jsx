import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  StepIndicator,
  AppointmentForm,
  DemographicForm,
  DocumentForm,
  AdditionalDocumentForm,
  Summary,
} from "../components";

import CancelPopUp from "../components/PopUp/CancelPopUp";

export default function PassportForm() {
  const [currentStep, setCurrentStep] = useState(4);
  const [showCancelPopup, setShowCancelPopup] = useState(false);

  const passportType = useSelector((state) => state.passport.passportType);

  const navigate = useNavigate();

  const methods = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",

    defaultValues: {
      appointment: {
        province: "",
        provinceName: "",
        district: "",
        districtName: "",
        location: "",
        locationName: "",
        appointmentDate: null,
        appointmentTime: "",
        contact: "",
        email: "",
      },

      personalDetails: {
        personal: {
          givenName: "",
          surname: "",
          gender: "",
          dateOfBirth_AD: "",
          dateOfBirth_BS: "",
          nin: "",
          nationality: "Nepali",
          country: "Nepal",
          placeOfBirth: "",
        },

        citizenshipDetail: {
          citizenship: "",
          minorId: "",
          issueCountry: "Nepal",
          issueDistrict: "",
          issueDate_AD: "",
        },

        parental: {
          motherName: "",
          motherSurname: "",
          fatherName: "",
          fatherSurname: "",
        },
      },

      contact: {
        phoneNumber: "",
        email: "",
      },

      residentialAddress: {
        country: "",
        province: "",
        provinceName: "",
        district: "",
        districtName: "",
        municipality: "",
        municipalityName: "",
        ward: "",
        street: "",
        houseNumber: "",
      },

      proxyDetails: {
        proxy: "",
        firstName: "",
        surname: "",
      },

      temporaryAddress: {
        country: "NEPAL",
        province: "",
        provinceName: "",
        district: "",
        districtName: "",
        municipality: "",
        municipalityName: "",
        ward: "",
        tole: "",
        houseNumber: "",
      },

      passportRenewal: {
        passportNumber: "",
        dateOfIssue: null,
        placeOfIssue: "",
        dateOfExpiry: null,
      },

      documents: [],

      additionalDocuments: [],
    },
  });

  const steps = [
    "Book an appointment",
    "Demographic data",
    "Supporting documents",

    ...(passportType?.keyword !== "NEW" ? ["Previous document"] : []),

    "Summary",
  ];

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleCancel = () => {
    setShowCancelPopup(true);
  };

  const handleClosePopup = () => {
    setShowCancelPopup(false);
  };

  const handleConfirmCancel = () => {
    setShowCancelPopup(false);

    methods.reset();

    navigate("/application/pre-enrollment-home");
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
        <StepIndicator currentStep={currentStep} steps={steps} />

        {/* {currentStep === 1 && (
          <AppointmentForm onFormNext={handleNext} onCancel={handleCancel} />
        )} */}

        {/* {currentStep === 2 && (
          <DemographicForm
            onFormNext={handleNext}
            onFormBack={handleBack}
            onCancel={handleCancel}
          />
        )} */}

        {/* {currentStep === 3 && (
          <DocumentForm
            onFormNext={handleNext}
            onFormBack={handleBack}
            onCancel={handleCancel}
          />
        )} */}

        {currentStep === 4 && passportType?.keyword !== "NEW" && (
          <AdditionalDocumentForm
            onFormNext={handleNext}
            onFormBack={handleBack}
            onCancel={handleCancel}
          />
        )}

        {currentStep === steps.length && (
          <Summary onFormBack={handleBack} onCancel={handleCancel} />
        )}

        {showCancelPopup && (
          <CancelPopUp
            handleClosePopup={handleClosePopup}
            handleConfirmCancel={handleConfirmCancel}
          />
        )}
      </form>
    </FormProvider>
  );
}
