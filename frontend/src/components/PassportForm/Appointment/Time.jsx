import React, { useState } from "react";
import AppointmentDatePicker from "../../Picker/AppointmentDatePicker";
import TimeSlotPicker from "../../Picker/TimeSlotPicker";
import CancelButton from "../../Common/Button/CancelButton";
import NextButton from "../../Common/Button/NextButton";
import BackButton from "../../Common/Button/BackButton";
export default function Time({ onBack, onNext, onCancel }) {
  const [appointmentDate, setAppointmentDate] = useState(null);
  const [appointmentTime, setAppointmentTime] = useState("");

  return (
    <div className="w-full px-4 py-6 sm:px-8">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1fr]">
        {/* Available Dates */}
        <section>
          <h2 className="mb-8 font-serif text-xl uppercase">Available Dates</h2>

          <AppointmentDatePicker
            value={appointmentDate}
            onChange={setAppointmentDate}
          />
        </section>

        {/* Available Time Slots */}
        <section>
          <h2 className="mb-8 text-center font-serif text-xl uppercase">
            Available Time Slots
          </h2>

          <TimeSlotPicker
            value={appointmentTime}
            onChange={setAppointmentTime}
          />
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
