import React from "react";
import { useFormContext } from "react-hook-form";

import Heading from "../../Common/Heading";
import BackButton from "../../Common/Button/BackButton";
import CancelButton from "../../Common/Button/CancelButton";
import NextButton from "../../Common/Button/NextButton";
import Input from "../../Common/Input";

const PHONE_REGEX = /^9[678]\d{8}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactDetails({ onBack, onCancel, onNext }) {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const contact = watch("contact.phoneNumber", "");
  const email = watch("contact.email", "");

  const isContactValid = PHONE_REGEX.test(contact);
  const isEmailValid = EMAIL_REGEX.test(email);

  const isNextDisabled = !isContactValid || !isEmailValid;

  return (
    <div className="w-full px-2 py-4 sm:px-4">
      <Heading text="CONTACT INFORMATION" />

      <div className="m-6 grid grid-cols-1 gap-4 px-4 sm:grid-cols-2">
        <Input
          label="Phone Number"
          type="tel"
          placeholder="98XXXXXXXX"
          required
          error={errors.contact?.phoneNumber?.message}
          {...register("contact.phoneNumber", {
            required: "Phone number is required",
            pattern: {
              value: PHONE_REGEX,
              message: "Please enter a valid phone number",
            },
          })}
        />

        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          required
          error={errors.contact?.email?.message}
          {...register("contact.email", {
            required: "Email is required",
            pattern: {
              value: EMAIL_REGEX,
              message: "Please enter a valid email",
            },
          })}
        />
      </div>

      <div className="mt-16 flex items-center justify-between sm:mt-32">
        <div className="flex gap-6">
          <BackButton onClick={onBack} />
          <CancelButton onClick={onCancel} />
        </div>

        <NextButton onClick={onNext} disabled={isNextDisabled} />
      </div>
    </div>
  );
}
