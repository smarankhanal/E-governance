import React, { useState } from "react";
import { MdKeyboardArrowDown, MdClose } from "react-icons/md";

export default function LocationSelect({
  label,
  value = "",
  placeholder = "",
  options = [],
  onChange,
  disabled = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const hasValue = Boolean(value);
  const selectedOption = options.find((option) => option.id === value);
  const displayValue = selectedOption
    ? selectedOption.name.en
    : value || placeholder;
  const handleSelect = (option) => {
    onChange?.({
      target: {
        value: option.id,
      },
    });

    setIsOpen(false);
  };

  const handleClear = (event) => {
    event.stopPropagation();
    onChange?.({
      target: {
        value: "",
      },
    });

    setIsOpen(false);
  };

  return (
    <div className="relative flex flex-col gap-2">
      <label className="font-serif text-base text-[#294e78] sm:text-xl">
        {label} <span className="text-[#294e78]">*</span>
      </label>

      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`
          flex h-15 w-full
          items-center justify-between
          rounded-lg
          border border-[#ccd3db]
          bg-white
          px-3
          font-serif
          text-left
          text-base
          text-[#597fad]
          transition-all
          duration-200
          hover:border-[#009DAC]
          focus:outline-none
          focus:ring-1
          focus:ring-[#009DAC]
          sm:text-lg
          ${
            disabled
              ? "cursor-not-allowed bg-gray-100 text-gray-400"
              : "cursor-pointer"
          }
          ${isOpen ? "border-[#009DAC] ring-1 ring-[#009DAC]" : ""}
        `}
      >
        <span className={hasValue ? "text-[#597fad]" : "text-[#8c9299]"}>
          {displayValue}
        </span>

        <div className="flex items-center">
          {hasValue && !disabled && (
            <span
              role="button"
              onClick={handleClear}
              className="mr-2 text-[#707985] hover:text-[#34404d]"
            >
              <MdClose className="h-6 w-6" />
            </span>
          )}

          <MdKeyboardArrowDown
            className={`
              h-7 w-7
              text-[#707985]
              transition-transform
              duration-200
              ${isOpen ? "rotate-180" : ""}
            `}
          />
        </div>
      </button>

      {isOpen && !disabled && (
        <div
          className="
            absolute
            left-0
            right-0
            top-full
            z-50
            mt-2
            max-h-60
            overflow-y-auto
            rounded-lg
            border
            border-[#ccd3db]
            bg-white
            shadow-lg
          "
        >
          {options.length === 0 ? (
            <div className="px-4 py-3 font-serif text-[#8c9299]">
              No options available
            </div>
          ) : (
            options.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => handleSelect(option)}
                className="
                  block
                  w-full
                  px-4
                  py-3
                  text-left
                  font-serif
                  text-base
                  text-[#597fad]
                  transition-colors
                  hover:bg-[#eaf2fb]
                  sm:text-lg
                "
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
