import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import Heading from "../../../Common/Heading";
import Input from "../../../Common/Input";
import Select from "../../../Common/Select";
import DatePicker from "../../../Picker/DatePicker";
import { useAgeValidation } from "../../../../hooks/useAgeValidation";

export default function CitizenshipDetails({ districts }) {
  const {
    control,
    register,
    watch,
    formState: { errors },
  } = useFormContext();
  const dateOfBirth = watch("personalDetails.personal.dateOfBirth_AD", "");
  const { age } = useAgeValidation(dateOfBirth);
  const isMinor = age !== null && age < 16;
  return (
    <div className="w-full px-2 py-4 sm:px-4">
      <Heading text="CITIZENSHIP DETAILS (MINOR / CITIZEN ID)" />
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {isMinor ? (
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
        ) : (
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
                message: "Citizenship number must contain only numbers",
              },
            })}
          />
        )}

        <Input
          type="text"
          label="Issue Country"
          value="Nepal"
          readOnly
          required
          {...register("personalDetails.citizenshipDetail.issueCountry")}
        />

        <Controller
          name="personalDetails.citizenshipDetail.issueDistrict"
          control={control}
          rules={{
            required: "Issue district is required",
          }}
          render={({ field, fieldState }) => (
            <Select
              label="Place of issue (district)"
              placeholder="Select district"
              options={districts}
              required
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              name={field.name}
              error={fieldState.error?.message}
            />
          )}
        />

        <Controller
          name="personalDetails.citizenshipDetail.issueDate_AD"
          control={control}
          rules={{
            required: "Date of issue is required",
          }}
          render={({ field, fieldState }) => (
            <DatePicker
              label="Date of Issue AD"
              required
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={fieldState.error?.message}
            />
          )}
        />
      </div>
    </div>
  );
}
