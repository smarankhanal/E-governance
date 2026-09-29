import React from "react";
import { useFormContext } from "react-hook-form";

import Input from "../../Common/Input";

import BackButton from "../../Common/Button/BackButton";
import CancelButton from "../../Common/Button/CancelButton";
import NextButton from "../../Common/Button/NextButton";

const PHONE_REGEX = /^9[678]\d{8}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AppointmentSummary({ onBack, onCancel, onFormNext }) {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const provinceName = watch("appointment.provinceName");
  const districtName = watch("appointment.districtName");
  const locationName = watch("appointment.locationName");
  const appointmentDate = watch("appointment.appointmentDate");
  const appointmentTime = watch("appointment.appointmentTime");
  const contact = watch("appointment.contact", "");
  const email = watch("appointment.email", "");

  const formattedDate = appointmentDate
    ? new Date(appointmentDate).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "-";

  const isContactValid = PHONE_REGEX.test(contact ?? "");
  const isEmailValid = EMAIL_REGEX.test(email ?? "");
  const isNextDisabled = !isContactValid || !isEmailValid;

  return (
    <div className="w-full px-4 py-6 sm:px-8">
      <section>
        <h2 className="mb-8 font-serif text-xl uppercase text-text-dark">
          Appointment Summary
        </h2>

        <div className="rounded-lg border border-border-card bg-white p-6 shadow-sm">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <p className="text-sm text-text-primary">Appointment Country</p>

              <p className="mt-1 font-medium text-text-primary">Nepal</p>
            </div>

            <div>
              <p className="text-sm text-text-primary">Appointment Province</p>

              <p className="mt-1 font-medium text-text-primary">
                {provinceName || "-"}
              </p>
            </div>

            <div>
              <p className="text-sm text-text-primary">Appointment District</p>

              <p className="mt-1 font-medium text-text-primary">
                {districtName || "-"}
              </p>
            </div>

            <div>
              <p className="text-sm text-text-primary">Appointment Location</p>

              <p className="mt-1 font-medium text-text-primary">
                {locationName || "-"}
              </p>
            </div>

            <div>
              <p className="text-sm text-text-primary">Appointment Date</p>

              <p className="mt-1 font-medium text-text-primary">
                {formattedDate}
              </p>
            </div>

            <div>
              <p className="text-sm text-text-primary">Appointment Time</p>

              <p className="mt-1 font-medium text-text-primary">
                {appointmentTime || "-"}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-6 font-serif text-xl uppercase text-text-dark">
          Contact Information
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Input
            label="Contact"
            placeholder="Enter contact number"
            type="tel"
            required
            error={errors.appointment?.contact?.message}
            {...register("appointment.contact", {
              required: "Contact number is required",
              pattern: {
                value: PHONE_REGEX,
                message: "Enter a valid Nepali mobile number",
              },
            })}
          />

          <Input
            label="Email"
            placeholder="Enter email address"
            type="email"
            required
            error={errors.appointment?.email?.message}
            {...register("appointment.email", {
              required: "Email is required",
              pattern: {
                value: EMAIL_REGEX,
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
