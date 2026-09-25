import React, { useEffect, useState } from "react";
import Heading from "../../Common/Heading";
import Input from "../../Common/Input";
import Select from "../../Common/Select";
import { Controller, useFormContext } from "react-hook-form";
import DatePicker from "../../Picker/DatePicker";
import { getAllDistricts } from "../../../services/addressApi";
import { useSelector } from "react-redux";

export default function DamagedPassport() {
  const {
    control,
    register,
    trigger,
    formState: { errors },
  } = useFormContext();

  const passportType = useSelector((state) => state.application.passportType);

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

  const headingMap = {
    RENEWAL: "Passport Renewal",
    DAMAGED: "Damaged Passport",
    "DATA CORRECTION": "Passport Data Correction",
  };

  const heading = headingMap[passportType?.keyword];

  return (
    <div className="w-full px-4 py-6 sm:px-8">
      <Heading text={heading} />

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <Input
          label="Passport Number"
          placeholder="Enter passport number"
          required
          {...register("passportRenewal.passportNumber", {
            required: "Passport number is required",
          })}
          error={errors.passportRenewal?.passportNumber?.message}
        />

        <Controller
          name="passportRenewal.dateOfIssue"
          control={control}
          rules={{
            required: "Date of issue is required",
          }}
          render={({ field }) => (
            <DatePicker
              label="Date of Issue (AD)"
              value={field.value}
              onChange={(date) => {
                field.onChange(date);
                trigger("passportRenewal.dateOfIssue");
              }}
              onBlur={field.onBlur}
              error={errors.passportRenewal?.dateOfIssue?.message}
            />
          )}
        />

        <Controller
          name="passportRenewal.placeOfIssue"
          control={control}
          rules={{
            required: "Place of issue is required",
          }}
          render={({ field }) => (
            <Select
              label="Place of Issue"
              required
              options={districts}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              name={field.name}
              error={errors.passportRenewal?.placeOfIssue?.message}
            />
          )}
        />

        <Controller
          name="passportRenewal.dateOfExpiry"
          control={control}
          rules={{
            required: "Date of expiry is required",
          }}
          render={({ field }) => (
            <DatePicker
              label="Date of Expiry (AD)"
              value={field.value}
              onChange={(date) => {
                field.onChange(date);
                trigger("passportRenewal.dateOfExpiry");
              }}
              onBlur={field.onBlur}
              error={errors.passportRenewal?.dateOfExpiry?.message}
            />
          )}
        />
      </div>
    </div>
  );
}
