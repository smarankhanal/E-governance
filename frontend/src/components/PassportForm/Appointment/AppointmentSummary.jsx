import React from "react";
import { useForm } from "react-hook-form";

import Input from "../../Common/Input";
import BackButton from "../../Common/Button/BackButton";
import CancelButton from "../../Common/Button/CancelButton";
import NextButton from "../../Common/Button/NextButton";

export default function AppointmentSummary({
  location = "Department of Passports",
  date = "2026-10-01",
  time = "15:00:00",
  onBack,
  onNext,
  onCancel,
}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  // Watch input values
  const contact = watch("contact", "");
  const email = watch("email", "");

  // Next button is disabled until both fields have data
  const isNextDisabled = !contact.trim() || !email.trim();

  const onSubmit = (data) => {
    console.log("Contact information:", data);

    onNext(data);
  };

  return (
    <div className="w-full px-4 py-6 sm:px-8">
      {/* ================= Appointment Summary ================= */}
      <section>
        <div className="text-left">
          <h2 className="font-serif text-2xl uppercase text-[#1c1c1c] sm:text-3xl">
            Appointment Summary
          </h2>
        </div>

        <div className="mt-10 max-w-3xl rounded-lg border border-[#e1e5e9]">
          <div className="grid grid-cols-2 border-b border-[#e1e5e9] p-5 text-center">
            <span className="font-medium text-[#495057]">
              Appointment location
            </span>

            <span className="text-[#6f747a]">{location}</span>
          </div>

          <div className="grid grid-cols-2 border-b border-[#e1e5e9] p-5 text-center">
            <span className="font-medium text-[#495057]">Date</span>

            <span className="text-[#6f747a]">{date}</span>
          </div>

          <div className="grid grid-cols-2 p-5 text-center">
            <span className="font-medium text-[#495057]">Time</span>

            <span className="text-[#6f747a]">{time}</span>
          </div>
        </div>
      </section>

      {/* ================= Contact Information ================= */}
      <section className="mt-10">
        <h2 className="font-serif text-xl uppercase text-[#495057]">
          Contact information
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6 max-w-2xl space-y-6"
        >
          <Input
            label="Contact"
            placeholder="Enter contact number"
            type="tel"
            required
            error={errors.contact?.message}
            {...register("contact", {
              required: "Contact number is required",
              pattern: {
                value: /^9[678]\d{8}$/,
                message: "Enter a valid Nepali mobile number",
              },
            })}
          />

          <Input
            label="Email"
            placeholder="Enter email address"
            type="email"
            required
            error={errors.email?.message}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
          />
        </form>
      </section>

      {/* ================= Buttons ================= */}
      <div className="mt-16 flex items-center justify-between sm:mt-32">
        <div className="flex gap-6">
          <BackButton onClick={onBack} />
          <CancelButton onClick={onCancel} />
        </div>

        <NextButton
          disabled={isNextDisabled}
          onClick={handleSubmit(onSubmit)}
        />
      </div>
    </div>
  );
}
