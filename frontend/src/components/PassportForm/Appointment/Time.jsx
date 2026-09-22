import React from "react";
import { useFormContext } from "react-hook-form";

import AppointmentDatePicker from "../../Picker/AppointmentDatePicker";
import TimeSlotPicker from "../../Picker/TimeSlotPicker";

import CancelButton from "../../Common/Button/CancelButton";
import NextButton from "../../Common/Button/NextButton";
import BackButton from "../../Common/Button/BackButton";

export default function Time({ onBack, onNext, onCancel }) {
  const { watch, setValue } = useFormContext();

  const appointmentDate = watch("appointment.appointmentDate");
  const appointmentTime = watch("appointment.appointmentTime");

  const handleDateChange = (date) => {
    setValue("appointment.appointmentDate", date, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const handleTimeChange = (time) => {
    setValue("appointment.appointmentTime", time, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  return (
    <div className="w-full px-4 py-6 sm:px-8">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1fr]">
        <section>
          <h2 className="mb-8 font-serif text-xl uppercase">Available Dates</h2>

          <AppointmentDatePicker
            value={appointmentDate}
            onChange={handleDateChange}
          />
        </section>

        <section>
          <h2 className="mb-8 text-center font-serif text-xl uppercase">
            Available Time Slots
          </h2>

          <TimeSlotPicker value={appointmentTime} onChange={handleTimeChange} />
        </section>
      </div>

      <div className="mt-16 flex items-center justify-between sm:mt-32">
        <div className="flex gap-6">
          <BackButton onClick={onBack} />
          <CancelButton onClick={onCancel} />
        </div>

        <NextButton
          disabled={!appointmentDate || !appointmentTime}
          onClick={onNext}
        />
      </div>
    </div>
  );
}
