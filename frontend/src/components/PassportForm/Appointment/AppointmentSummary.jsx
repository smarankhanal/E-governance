import React from "react";
import { useFormContext } from "react-hook-form";

import Input from "../../Common/Input";

import BackButton from "../../Common/Button/BackButton";
import CancelButton from "../../Common/Button/CancelButton";
import NextButton from "../../Common/Button/NextButton";

export default function AppointmentSummary({ onBack, onCancel, onFormNext }) {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const provinceName = watch("provinceName");
  const districtName = watch("districtName");
  const locationName = watch("locationName");
  const appointmentDate = watch("appointmentDate");
  const appointmentTime = watch("appointmentTime");
  const contact = watch("contact", "");
  const email = watch("email", "");
  const formattedDate = appointmentDate
    ? new Date(appointmentDate).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "-";

  const isNextDisabled = !contact?.trim() || !email?.trim();

  return (
    <div className="w-full px-4 py-6 sm:px-8">
      <section>
        <h2 className="mb-8 font-serif text-xl uppercase text-[#1c1c1c]">
          Appointment Summary
        </h2>

        <div className="rounded-lg border border-[#d9dee5] bg-white p-6 shadow-sm">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <p className="text-sm text-[#8c9299]">Appointment Country</p>

              <p className="mt-1 font-medium text-[#495057]">Nepal</p>
            </div>

            <div>
              <p className="text-sm text-[#8c9299]">Appointment Province</p>

              <p className="mt-1 font-medium text-[#495057]">
                {provinceName || "-"}
              </p>
            </div>

            <div>
              <p className="text-sm text-[#8c9299]">Appointment District</p>

              <p className="mt-1 font-medium text-[#495057]">
                {districtName || "-"}
              </p>
            </div>

            <div>
              <p className="text-sm text-[#8c9299]">Appointment Location</p>

              <p className="mt-1 font-medium text-[#495057]">
                {locationName || "-"}
              </p>
            </div>

            <div>
              <p className="text-sm text-[#8c9299]">Appointment Date</p>

              <p className="mt-1 font-medium text-[#495057]">{formattedDate}</p>
            </div>

            <div>
              <p className="text-sm text-[#8c9299]">Appointment Time</p>

              <p className="mt-1 font-medium text-[#495057]">
                {appointmentTime || "-"}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-6 font-serif text-xl uppercase text-[#1c1c1c]">
          Contact Information
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
        </div>
      </section>

      <div className="mt-16 flex items-center justify-between sm:mt-32">
        <div className="flex gap-6">
          <BackButton onClick={onBack} />

          <CancelButton onClick={onCancel} />
        </div>

        <NextButton
          type="submit"
          disabled={isNextDisabled}
          onClick={onFormNext}
        />
      </div>
    </div>
  );
}
