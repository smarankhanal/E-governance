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
          nationality: "",
          country: "",
          placeOfBirth: "",
        },

        citizenshipDetail: {
          citizenship: "",
          minorId: "",
          issueCountry: "",
          issueDistrict: "",
          issueDate_Bs: "",
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
        country: "NEPAL",
        province: "",
        district: "",
        municipality: "",
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

      documents: {
        citizenship: null,
        photo: null,
      },

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
        {/* <StepIndicator currentStep={currentStep} /> */}
        <StepIndicator currentStep="5" />
        {/* {currentStep === 1 && <AppointmentForm onFormNext={handleNext} />}

        {currentStep === 2 && (
          <DemographicForm onFormNext={handleNext} onFormBack={handleBack} />
        )} */}

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
