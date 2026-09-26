import React from "react";
import { useFormContext } from "react-hook-form";

import BackButton from "../../Common/Button/BackButton";
import CancelButton from "../../Common/Button/CancelButton";
import InfoAlert from "../../Common/InfoAlert";
import DetailsTable from "./DetailsTable";
import { useAgeValidation } from "../../../hooks/useAgeValidation";
import { useSelector } from "react-redux";

export default function Summary({ onFormBack, onCancel }) {
  const { passportType, selectedDocument } = useSelector(
    (state) => state.passport,
  );
  const { watch } = useFormContext();
  const formData = watch();
  const dateOfBirth = watch("personalDetails.personal.dateOfBirth_AD", "");
  const { age } = useAgeValidation(dateOfBirth);
  const isMinor = age !== null && age < 16;

  const parentalDetails = [
    {
      label1: "Mother given's name",
      value1: formData.personal?.parental?.motherName,
      label2: "Mother surname",
      value2: formData.personal?.parental?.motherSurname,
    },
    {
      label1: "Father Given's name",
      value1: formData.personal?.parental?.fatherName,
      label2: "Father surname",
      value2: formData.personal?.parental?.fatherSurname,
    },
    ,
  ];
  const applicationDetails = [
    {
      label1: "Application type",
      value1: passportType?.keyword || "NEW",
      label2: "Document type",
      value2: formData.documentType || "Passport",
    },
    {
      label1: "Document subtype",
      value1: formData.documentSubtype || "ordinary",
      label2: "Ordinary type",
      value2: selectedDocument || "ordinary66",
    },
    {
      label1: "Priority",
      value1: formData.priority || "NORMAL",
    },
  ];

  const personalDetails = [
    {
      label1: "Given name",
      value1: formData.personalDetails?.personal?.givenName,
      label2: "Surname",
      value2: formData.personalDetails?.personal?.surname,
    },
    {
      label1: "Gender",
      value1: formData.personalDetails?.personal?.gender,
      label2: "Nationality",
      value2: formData.personalDetails?.personal?.nationality,
    },
    {
      label1: "Date of birth AD",
      value1: formData.personalDetails?.personal?.dateOfBirth_AD,
      label2: "Date of birth BS",
      value2: formData.personalDetails?.personal?.dateOfBirth_BS,
    },
    {
      label1: "NIN",
      value1: formData.personalDetails?.personal?.nin,
      label2: "Place of birth",
      value2: formData.personalDetails?.personal?.placeOfBirth,
    },
  ];

  const citizenshipDetails = [
    {
      label1: isMinor ? "Minor ID" : "Citizenship number",
      value1: isMinor
        ? formData.personalDetails?.citizenshipDetail?.minorId
        : formData.personalDetails?.citizenshipDetail?.citizenship,
      label2: "Issue country",
      value2: formData.personalDetails?.citizenshipDetail?.issueCountry,
    },
    {
      label1: "Issue district",
      value1: formData.personalDetails?.citizenshipDetail?.issueDistrict,
      label2: "Date of issue AD",
      value2: formData.personalDetails?.citizenshipDetail?.issueDate_AD,
    },
  ];

  const contactDetails = [
    {
      label1: "Phone number",
      value1: formData.contact?.phoneNumber,
      label2: "Email",
      value2: formData.contact?.email,
    },
  ];

  const residentialAddress = [
    {
      label1: "Country",
      value1: formData.residentialAddress?.country,
      label2: "Province",
      value2: formData.residentialAddress?.provinceName,
    },
    {
      label1: "District",
      value1: formData.residentialAddress?.districtName,
      label2: "Municipality",
      value2: formData.residentialAddress?.municipalityName,
    },
    {
      label1: "Ward",
      value1: formData.residentialAddress?.ward,
      label2: "Street",
      value2: formData.residentialAddress?.street,
    },
    {
      label1: "House number",
      value1: formData.residentialAddress?.houseNumber,
    },
  ];

  const proxyDetails = [
    {
      label1: "Proxy",
      value1: formData.proxyDetails?.proxy,
      label2: "First name",
      value2: formData.proxyDetails?.firstName,
    },
    {
      label1: "Surname",
      value1: formData.proxyDetails?.surname,
    },
  ];

  const appointmentDetails = [
    {
      label1: "Province",
      value1: formData.appointment?.provinceName,
      label2: "District",
      value2: formData.appointment?.districtName,
    },
    {
      label1: "Location",
      value1: formData.appointment?.locationName,
      label2: "Appointment date",
      value2: formData.appointment?.appointmentDate
        ? formData.appointment.appointmentDate.toLocaleDateString("en-CA")
        : "",
    },
    {
      label1: "Appointment time",
      value1: formData.appointment?.appointmentTime,
      label2: "Contact",
      value2: formData.appointment?.contact,
    },
    {
      label1: "Email",
      value1: formData.appointment?.email,
    },
  ];
  const previousPassportDetails = [
    {
      label1: "Passport number",
      value1: formData.previousDocument?.passportNumber,
      label2: "Place of issue",
      value2: formData.previousDocument?.placeOfIssue,
    },
    {
      label1: "Date of issue",
      value1: formData.previousDocument?.dateOfIssue,
      label2: "Date of expiry",
      value2: formData.previousDocument?.dateOfExpiry,
    },
  ];

  const lostStolenDetails = [
    {
      label1: "Latest Document number",
      value1: formData.lostStolenPassport?.latestDocumentNumber,
      label2: "Place of issue",
      value2: formData.lostStolenPassport?.placeOfIssue,
    },

    {
      label1: "Country of theft/loss",
      value1: formData.lostStolenPassport?.countryOfTheft || "Nepal",
      label2: "Date of theft/loss",
      value2: formData.lostStolenPassport?.dateOfTheft,
    },
    {
      label1: "Date of issue",
      value1: formData.lostStolenPassport?.dateOfIssue,
    },
  ];
  return (
    <div className="w-full">
      <InfoAlert
        text="YOU ARE ALMOST DONE. PLEASE CHECK YOUR DATA. IF EVERYTHING IS OK, CLICK APPLY"
        className="mx-2"
      />

      <div className="mt-8 space-y-8 px-2">
        {/* Application Details */}
        <DetailsTable title="APPLICATION DETAILS" rows={applicationDetails} />

        {/* Appointment Details */}
        <DetailsTable title="APPOINTMENT DETAILS" rows={appointmentDetails} />

        {/* Personal Details */}
        <DetailsTable title="PERSONAL DETAILS" rows={personalDetails} />

        {/* Citizenship Details */}
        <DetailsTable title="CITIZENSHIP DETAILS" rows={citizenshipDetails} />

        {/* Contact Details */}
        <DetailsTable title="CONTACT DETAILS" rows={contactDetails} />

        {/* Residential Address */}
        <DetailsTable title="RESIDENTIAL ADDRESS" rows={residentialAddress} />

        {/*Parental Details */}
        <DetailsTable title="PARENTAL DETAILS" rows={parentalDetails} />
        {/* Proxy Details */}
        {isMinor && <DetailsTable title="PROXY DETAILS" rows={proxyDetails} />}
        {["RENEWAL", "DAMAGED", "DATA CORRECTION", "LOST/STOLEN"].includes(
          passportType.keyword,
        ) && (
          <DetailsTable
            title="PREVIOUS PASSPORT DETAILS"
            rows={previousPassportDetails}
          />
        )}

        {passportType.keyword === "LOST/STOLEN" && (
          <DetailsTable title="LOST/STOLEN DETAILS" rows={lostStolenDetails} />
        )}
      </div>

      {/* Buttons */}
      <div className="mt-12 flex items-center justify-between px-2 pb-8">
        <div className="flex gap-6">
          <BackButton onClick={onFormBack} />

          <CancelButton onClick={onCancel} />
        </div>

        <button
          type="submit"
          className="rounded-md bg-[#2F5F98] px-8 py-3 font-serif text-base font-medium text-white transition hover:bg-[#294e78]"
        >
          APPLY
        </button>
      </div>
    </div>
  );
}
