import React from "react";
import { Controller, useFormContext } from "react-hook-form";

import BackButton from "../../Common/Button/BackButton";
import CancelButton from "../../Common/Button/CancelButton";
import NextButton from "../../Common/Button/NextButton";
import Input from "../../Common/Input";
import Heading from "../../Common/Heading";
import InfoAlert from "../../Common/InfoAlert";
import Select from "../../Common/Select";
import { useAgeValidation } from "../../../hooks/useAgeValidation";

export default function ProxyDetails({ onBack, onCancel, onFormNext }) {
  const {
    control,
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const proxy = watch("proxyDetails.proxy", "");
  const firstName = watch("proxyDetails.firstName", "");
  const surname = watch("proxyDetails.surname", "");

  const dateOfBirth = watch("personalDetails.personal.dateOfBirth_AD", "");
  const { age } = useAgeValidation(dateOfBirth);
  const isMinor = age !== null && age < 16;

  const isNextDisabled = isMinor
    ? !proxy || !firstName.trim() || !surname.trim()
    : false;

  const options = ["Father", "Mother", "Other"];

  return (
    <div className="w-full px-2 py-4 sm:px-4">
      <InfoAlert
        text={isMinor ? "Please fill the below details" : "Only for minors"}
      />

      <Heading text="PROXY DETAILS" className="m-2" />

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
        <Controller
          name="proxyDetails.proxy"
          control={control}
          rules={{
            required: "Proxy is required",
          }}
          render={({ field, fieldState }) => (
            <Select
              label="Proxy"
              options={options}
              placeholder="Select proxy"
              required
              disabled={!isMinor}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              name={field.name}
              error={fieldState.error?.message}
            />
          )}
        />

        <Input
          type="text"
          label="Proxy's given name"
          required
          disabled={!isMinor}
          error={errors.proxyDetails?.firstName?.message}
          {...register("proxyDetails.firstName", {
            required: "First name is required",
          })}
        />

        <Input
          type="text"
          label="Proxy's surname"
          required
          disabled={!isMinor}
          error={errors.proxyDetails?.surname?.message}
          {...register("proxyDetails.surname", {
            required: "Surname is required",
          })}
        />
      </div>

      <div className="mt-16 flex items-center justify-between sm:mt-32">
        <div className="flex gap-6">
          <BackButton onClick={onBack} />
          <CancelButton onClick={onCancel} />
        </div>

        <NextButton onClick={onFormNext} disabled={isNextDisabled} />
      </div>
    </div>
  );
}
