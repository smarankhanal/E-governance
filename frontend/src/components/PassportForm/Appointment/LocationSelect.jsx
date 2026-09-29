import React, { useState } from "react";
import { MdKeyboardArrowDown, MdClose } from "react-icons/md";

export default function LocationSelect({
  label,
  value = "",
  placeholder = "Select a location",
  options = [],
  onChange,
  disabled = false,
}) {
  const [isOpen, setIsOpen] = useState(false);

  // Find the selected API object using its ID.
  const selectedOption = options.find((option) => option.id === value);

  // Display the English name instead of the stored ID.
  const displayValue = selectedOption?.name?.en || placeholder;

  const handleSelect = (option) => {
    onChange?.({
      target: { value: option.id },
    });

    setIsOpen(false);
  };

  const handleClear = (event) => {
    event.stopPropagation();
    onChange?.({
      target: { value: "" },
    });
    setIsOpen(false);
  };

  return (
    <div className="relative flex flex-col gap-2">
      {label && (
        <label className="font-serif text-text-primary sm:text-xl">
          {label} <span className="text-text-primary">*</span>
        </label>
      )}

      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex h-15 w-full items-center justify-between rounded-lg border border-border-input bg-white px-3 font-serif text-left transition-all duration-200 hover:border-accent focus:outline-none focus:ring-1 focus:ring-accent sm:text-lg ${disabled ? "cursor-not-allowed bg-gray-100 text-gray-400" : "cursor-pointer"} ${isOpen ? "border-accent ring-1 ring-accent" : ""}`}
      >
        <span className={value ? "text-text-option" : "text-text-primary"}>
          {displayValue}
        </span>

        <div className="flex items-center">
          {value && !disabled && (
            <span
              role="button"
              onClick={handleClear}
              className="mr-2 text-icon-secondary hover:text-icon-secondary-hover"
            >
              <MdClose className="h-6 w-6" />
            </span>
          )}

          <MdKeyboardArrowDown
            className={`h-7 w-7 text-icon-secondary transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      {isOpen && !disabled && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-60 overflow-y-auto rounded-lg border border-border-input bg-white shadow-lg">
          {options.length === 0 ? (
            <div className="px-4 py-3 font-serif text-text-primary">
              No options available
            </div>
          ) : (
            options.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => handleSelect(option)}
                className="block w-full px-4 py-3 text-left font-serif text-base text-text-option transition-colors hover:bg-surface-hover sm:text-lg"
              >
                {option?.name?.en}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
