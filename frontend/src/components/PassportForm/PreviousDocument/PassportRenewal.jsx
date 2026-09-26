import React, { useEffect, useState } from "react";
import Heading from "../../Common/Heading";
import Input from "../../Common/Input";
import Select from "../../Common/Select";
import { Controller, useFormContext } from "react-hook-form";
import DatePicker from "../../Picker/DatePicker";
import { getAllDistricts } from "../../../services/addressApi";

export default function passportRenewal() {
  const {
    control,
    register,
    trigger,
    formState: { errors },
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
      <Heading text="Last/Current Passport Information" />

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <Input
          label="Passport Number"
          placeholder="Enter passport number"
          labelclassName="text-base"
          required
          {...register("previousDocument.passportNumber", {
            required: "Passport number is required",
          })}
          error={errors.previousDocument?.passportNumber?.message}
        />

        <Controller
          name="previousDocument.dateOfIssue"
          control={control}
          rules={{
            required: "Date of issue is required",
          }}
          render={({ field }) => (
            <DatePicker
              label="Date of Issue (AD)"
              value={field.value}
              labelclassName="text-base"
              onChange={(date) => {
                field.onChange(date);
                trigger("previousDocument.dateOfIssue");
              }}
              onBlur={field.onBlur}
              error={errors.previousDocument?.dateOfIssue?.message}
            />
          )}
        />

        <Controller
          name="previousDocument.placeOfIssue"
          control={control}
          rules={{
            required: "Place of issue is required",
          }}
          render={({ field }) => (
            <Select
              label="Place of Issue"
              labelclassName="text-base"
              required
              options={districts}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              name={field.name}
              error={errors.previousDocument?.placeOfIssue?.message}
            />
          )}
        />

        <Controller
          name="previousDocument.dateOfExpiry"
          control={control}
          rules={{
            required: "Date of expiry is required",
          }}
          render={({ field }) => (
            <DatePicker
              label="Date of Expiry (AD)"
              labelclassName="text-base"
              value={field.value}
              onChange={(date) => {
                field.onChange(date);
                trigger("previousDocument.dateOfExpiry");
              }}
              onBlur={field.onBlur}
              error={errors.previousDocument?.dateOfExpiry?.message}
            />
          )}
        />
      </div>
    </div>
  );
}
