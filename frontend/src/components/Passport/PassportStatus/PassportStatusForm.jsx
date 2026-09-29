import React from "react";
import { FiSearch } from "react-icons/fi";
import { Controller, useForm } from "react-hook-form";

import Input from "../../Common/Input";
import Button from "../../Common/Button/Button";
import DatePicker from "../../Picker/DatePicker";

export default function PassportStatusForm() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      applicationId: "",
      dateOfBirth: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="m-6 grid grid-cols-1 gap-4 px-4">
        <Input
          label="Application ID"
          type="text"
          required
          {...register("applicationId", {
            required: "Application ID is required",
          })}
          error={errors.applicationId?.message}
        />

        <Controller
          name="dateOfBirth"
          control={control}
          rules={{
            required: "Date of birth is required",
          }}
          render={({ field, fieldState }) => (
            <DatePicker
              label="Date of Birth"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={fieldState.error?.message}
            />
          )}
        />
      </div>

      <div className="m-6 px-4">
        <Button type="submit" logo={FiSearch}>
          Search
        </Button>
      </div>
    </form>
  );
}
