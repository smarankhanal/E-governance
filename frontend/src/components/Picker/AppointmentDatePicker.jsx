import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function AppointmentDatePicker({ value, onChange }) {
  return (
    <div className="w-full rounded-lg bg-white p-3">
      <Calendar
        value={value}
        onChange={onChange}
        minDate={new Date()}
        calendarType="gregory"
      />
    </div>
  );
}
