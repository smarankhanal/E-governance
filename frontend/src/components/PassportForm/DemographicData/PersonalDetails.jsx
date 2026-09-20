import React, { useEffect, useState } from "react";
import PersonalInfo from "./PersonalDetails/PersonalInfo";
import ParentalDetails from "./PersonalDetails/ParentalDetails";
import CitizenshipDetails from "./PersonalDetails/CitizenShipDetails";
import CancelButton from "../../Common/Button/CancelButton";
import NextButton from "../../Common/Button/NextButton";
import BackButton from "../../Common/Button/BackButton";
import { getAllDistricts } from "../../../services/addressApi";
import { useFormContext } from "react-hook-form";

export default function PersonalDetails({ onNext, onCancel, onFormBack }) {
  const {
    formState: { isValid },
  } = useFormContext();

  const [districts, setDistricts] = useState([]);
  useEffect(() => {
    const fetchAllDistricts = async () => {
      try {
        const data = await getAllDistricts();

        setDistricts(data);
      } catch (error) {
        console.error("Failed to fetch districts:", error);
      }
    };

    fetchAllDistricts();
  }, []);
  return (
    <div className="w-full px-4 py-6 sm:px-8">
      <PersonalInfo districts={districts} />
      <CitizenshipDetails districts={districts} />
      <ParentalDetails />
      <div className="mt-16 flex items-center justify-between sm:mt-32">
        <div className="flex gap-6">
          <BackButton onClick={onFormBack} />
          <CancelButton onClick={onCancel} />
        </div>
        <NextButton onClick={onNext} disabled={!isValid} />
      </div>
    </div>
  );
}
