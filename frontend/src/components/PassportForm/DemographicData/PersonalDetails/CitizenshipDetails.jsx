import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import Heading from "../../../Common/Heading";
import Input from "../../../Common/Input";
import Select from "../../../Common/Select";
import DatePicker from "../../../Picker/DatePicker";

export default function CitizenshipDetails({ districts }) {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="w-full px-2 py-4 sm:px-4">
      <Heading text="CITIZENSHIP DETAILS (MINOR / CITIZEN ID)" />
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
        <Input
          type="text"
          label="Citizenship Number"
          placeholder="Enter citizenship number"
          required
          error={
            errors.personalDetails?.citizenshipDetail?.citizenship?.message
          }
          {...register("personalDetails.citizenshipDetail.citizenship", {
            required: "Citizenship number is required",
            pattern: {
              value: /^\d+$/,
              message: "Citizenahip number must contain only numbers",
            },
          })}
        />

        <Input
          type="text"
          label="Minor ID"
          placeholder="Enter minor ID"
          required
          error={errors.personalDetails?.citizenshipDetail?.minorId?.message}
          {...register("personalDetails.citizenshipDetail.minorId", {
            required: "Minor ID is required",
            pattern: {
              value: /^\d+$/,
              message: "Minor ID must contain only numbers",
            },
          })}
        />

        <Input
          type="text"
          label="Issue Country"
          value="Nepal"
          readOnly
          required
          {...register("personalDetails.citizenshipDetail.issueCountry")}
        />

        <Select
          label="Place of issue (district)"
          options={districts}
          required
          error={
            errors.personalDetails?.citizenshipDetail?.issueDistrict?.message
          }
          {...register("personalDetails.citizenshipDetail.issueDistrict", {
            required: "Issue district is required",
          })}
        />

        <Controller
          name="personalDetails.citizenshipDetail.issueDate_Bs"
          control={control}
          rules={{
            required: "Date of issue is required",
          }}
          render={({ field }) => (
            <DatePicker
              label="Date of Issue AD"
              required
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={
                errors.personalDetails?.citizenshipDetail?.issueDate_Bs?.message
              }
            />
          )}
        />
      </div>
    </div>
  );
}
