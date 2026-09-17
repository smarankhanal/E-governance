import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Input from "../Common/Input";

export default function DateOfBirthPicker({ value, onChange, onBlur, error }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDateChange = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    onChange(`${year}-${month}-${day}`);

    setIsOpen(false);

    onBlur();
  };

  return (
    <div className="relative">
      <Input
        label="Date of birth AD"
        type="text"
        placeholder="YYYY-MM-DD"
        value={value || ""}
        error={error}
        required
        readOnly
        onClick={() => setIsOpen((prev) => !prev)}
        onBlur={onBlur}
        className="cursor-pointer"
      />

      {isOpen && (
        <div className="absolute z-50 mt-2 rounded-xl border border-gray-200 bg-white p-3 shadow-lg">
          <Calendar
            value={value ? new Date(`${value}T00:00:00`) : null}
            onChange={handleDateChange}
            maxDate={new Date()}
            calendarType="gregory"
          />
        </div>
      )}
    </div>
  );
}
