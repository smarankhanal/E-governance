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

import { useApplicationSession } from "../Context/ApplicationSessionContext";
import ReloadNotice from "../components/PopUp/ReloadNotice";

export default function PassportForm() {
  const [currentStep, setCurrentStep] = useState(1);

  const [showCancelPopup, setShowCancelPopup] = useState(false);

  const passportType = useSelector((state) => state.passport.passportType);

  const navigate = useNavigate();

  const { startApplicationSession, clearApplicationSession, applicationId } =
    useApplicationSession();

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

      previousDocument: {
        passportNumber: "",
        dateOfIssue: null,
        placeOfIssue: "",
        dateOfExpiry: null,
      },
      lostStolenPassport: {
        latestDocumentNumber: "",
        countryOfTheft: "",
        dateOfTheft: "",
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /*
   * Start application session when the
   * appointment step is completed.
   */
  const handleAppointmentNext = () => {
    startApplicationSession();
    handleNext();
  };

  /*
   * Open cancel confirmation popup.
   */
  const handleCancel = () => {
    setShowCancelPopup(true);
  };

  /*
   * Close cancel confirmation popup.
   */
  const handleClosePopup = () => {
    setShowCancelPopup(false);
  };

  /*
   * Clear everything and return to
   * the pre-enrollment page.
   */
  const handleConfirmCancel = () => {
    setShowCancelPopup(false);
    methods.reset();
    clearApplicationSession();
    setCurrentStep(1);
    navigate("/application/pre-enrollment-home", {
      replace: true,
    });
  };

  /*
   * Submit complete application.
   */
  const handleSubmitApplication = (data) => {
    console.log("Application ID:", applicationId);

    console.log("Complete application:", data);
  };

  return (
    <FormProvider {...methods}>
      <ReloadNotice />
      <form
        onSubmit={methods.handleSubmit(handleSubmitApplication)}
        className="mx-auto w-full max-w-4xl shadow-lg"
      >
        <StepIndicator currentStep={currentStep} steps={steps} />

        {currentStep === 1 && (
          <AppointmentForm
            onFormNext={handleAppointmentNext}
            onCancel={handleCancel}
          />
        )}

        {currentStep === 2 && (
          <DemographicForm
            onFormNext={handleNext}
            onFormBack={handleBack}
            onCancel={handleCancel}
          />
        )}

        {currentStep === 3 && (
          <DocumentForm
            onFormNext={handleNext}
            onFormBack={handleBack}
            onCancel={handleCancel}
          />
        )}

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
