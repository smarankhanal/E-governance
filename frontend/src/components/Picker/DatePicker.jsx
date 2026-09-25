import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Input from "../Common/Input";

export default function DatePicker({
  label,
  value,
  onChange,
  onBlur,
  error,
  labelclassName = "",
  placeholder = "YYYY-MM-DD",
  maxDate,
  minDate,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDateChange = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;

    onChange(formattedDate);
    onBlur?.();
    setIsOpen(false);
  };

  const handleInputBlur = () => {
    onBlur?.();
  };

  return (
    <div className="relative">
      <Input
        label={label}
        type="text"
        placeholder={placeholder}
        labelclassName={labelclassName}
        value={value || ""}
        error={error}
        required
        readOnly
        onClick={() => setIsOpen((prev) => !prev)}
        onBlur={handleInputBlur}
        className="cursor-pointer"
      />

      {isOpen && (
        <div className="absolute z-50 mt-2 rounded-xl border border-gray-200 bg-white p-3 shadow-lg">
          <Calendar
            value={value ? new Date(`${value}T00:00:00`) : null}
            onChange={handleDateChange}
            maxDate={maxDate}
            minDate={minDate}
            calendarType="gregory"
          />
        </div>
      )}
    </div>
  );
}
