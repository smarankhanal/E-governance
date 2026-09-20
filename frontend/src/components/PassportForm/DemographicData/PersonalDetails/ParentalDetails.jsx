import React from "react";
import InfoAlert from "../../../Common/InfoAlert";
import Heading from "../../../Common/Heading";
import Input from "../../../Common/Input";
import { useFormContext } from "react-hook-form";

export default function ParentalDetails() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div>
      <InfoAlert text="Parental information is mandatory. In case of unknown  information please enter 'UNKNOWN'" />
      <Heading text="PARENTAL INFORMATION" className="mt-4" />
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-4">
        <Input
          type="text"
          label="Mother's given name"
          labelclassName="text-base"
          required
          error={errors.personal?.parental?.motherName?.message}
          {...register("personal.parental.motherName", {
            required: " Mother name is required",
          })}
        />
        <Input
          type="text"
          label="Mother's Surname"
          labelclassName="text-base"
          required
          error={errors.personal?.parental?.motherSurname?.message}
          {...register("personal.parental.motherSurname", {
            required: "Mother surname is required",
          })}
        />
        <Input
          type="text"
          label="Father's given name"
          labelclassName="text-base"
          required
          error={errors.personal?.parental?.fatherName?.message}
          {...register("personal.parental.fatherName", {
            required: " Father name is required",
          })}
        />
        <Input
          type="text"
          label="Father's Surname"
          labelclassName="text-base"
          required
          error={errors.personal?.parental?.fatherSurname?.message}
          {...register("personal.parental.fatherSurname", {
            required: "Father surname is required",
          })}
        />
      </div>
    </div>
  );
}
