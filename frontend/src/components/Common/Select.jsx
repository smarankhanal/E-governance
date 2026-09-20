import React, { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowDown, MdClose, MdSearch } from "react-icons/md";

export default function Select({
  label,
  value = "",
  options = [],
  placeholder = "",
  searchPlaceholder = "Search...",
  required = false,
  error,
  disabled = false,
  onChange,
  onBlur,
  name,
  className = "",
  labelClassName = "",
  searchable = true,
  ...props
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedValue, setSelectedValue] = useState(value);

  const searchInputRef = useRef(null);

  // Keep the internal selected value synchronized
  // with React Hook Form's value.
  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  // Make sure options is always an array.
  const safeOptions = Array.isArray(options) ? options : [];

  // Get the text displayed for an option.
  // Supports both strings and API objects.
  const getOptionLabel = (option) =>
    typeof option === "string" ? option : option?.name?.en || "";

  // Filter options based on the search text.
  const filteredOptions = safeOptions.filter((option) =>
    getOptionLabel(option).toLowerCase().includes(search.toLowerCase()),
  );

  // Find the selected option using its stored value/ID.
  const selectedOption = safeOptions.find((option) =>
    typeof option === "string"
      ? option === selectedValue
      : option?.id === selectedValue,
  );

  const selectedLabel = selectedOption ? getOptionLabel(selectedOption) : "";

  // Focus search input when dropdown opens.
  useEffect(() => {
    if (isOpen && searchable) {
      searchInputRef.current?.focus();
    }
  }, [isOpen, searchable]);

  // Select an option.
  const handleSelect = (option) => {
    const newValue = typeof option === "string" ? option : option?.id || "";

    // Update the displayed value immediately.
    setSelectedValue(newValue);

    // Send the value to React Hook Form.
    onChange?.({
      target: {
        name,
        value: newValue,
      },
    });

    onBlur?.();

    setSearch("");
    setIsOpen(false);
  };

  // Clear selected option.
  const handleClear = (event) => {
    event.stopPropagation();

    setSelectedValue("");

    onChange?.({
      target: {
        name,
        value: "",
      },
    });

    onBlur?.();

    setSearch("");
    setIsOpen(false);
  };

  return (
    <div className="relative mx-2 flex flex-col gap-2">
      {/* Hidden input used by React Hook Form */}
      {name && (
        <input type="hidden" name={name} value={selectedValue} readOnly />
      )}

      {/* Label */}
      {label && (
        <label className={`font-serif text-[#294e78] text-xl${labelClassName}`}>
          {label}

          {required && (
            <span
              className={`ml-1 ${error ? "text-red-500" : "text-[#495070]"}`}
            >
              *
            </span>
          )}
        </label>
      )}

      {/* Select button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => {
          if (disabled) return;

          setIsOpen((prev) => !prev);
          setSearch("");
        }}
        className={`flex h-13 w-full items-center justify-between rounded-lg border bg-white px-3 font-serif text-left transition-all duration-200 hover:border-[#009DAC] focus:outline-none focus:ring-1 focus:ring-[#009DAC] sm:text-lg ${
          error ? "border-red-500 bg-red-50" : "border-[#ccd3db]"
        } ${
          disabled
            ? "cursor-not-allowed bg-gray-100 text-gray-400"
            : "cursor-pointer"
        } ${
          isOpen ? "border-[#009DAC] ring-1 ring-[#009DAC]" : ""
        } ${className}`}
        {...props}
      >
        <span className={selectedLabel ? "text-[#597fad]" : "text-[#8c9299]"}>
          {selectedLabel || placeholder}
        </span>

        <div className="flex items-center">
          {/* Clear button */}
          {selectedValue && !disabled && (
            <span
              role="button"
              onClick={handleClear}
              className="mr-2 text-[#707985] hover:text-[#34404d]"
            >
              <MdClose className="h-6 w-6" />
            </span>
          )}

          {/* Arrow */}
          <MdKeyboardArrowDown
            className={`h-7 w-7 text-[#707985] transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {/* Dropdown */}
      {isOpen && !disabled && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-lg border border-[#ccd3db] bg-white shadow-lg">
          {/* Search */}
          {searchable && (
            <div className="border-b border-[#e1e5e9] bg-white p-3">
              <div className="relative">
                <MdSearch className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8c9299]" />

                <input
                  ref={searchInputRef}
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  onClick={(event) => event.stopPropagation()}
                  placeholder={searchPlaceholder}
                  className="w-full rounded-md border border-[#ccd3db] bg-white py-2 pl-10 pr-3 font-serif text-base text-[#495057] outline-none placeholder:text-[#9aa1a8] focus:border-[#009DAC] focus:ring-1 focus:ring-[#009DAC]"
                />
              </div>
            </div>
          )}

          {/* Options */}
          <div className="max-h-60 overflow-y-auto">
            {filteredOptions.length === 0 ? (
              <div className="px-4 py-4 font-serif text-[#8c9299]">
                No options found
              </div>
            ) : (
              filteredOptions.map((option) => {
                const optionValue =
                  typeof option === "string" ? option : option.id;

                const isSelected = optionValue === selectedValue;

                return (
                  <button
                    key={optionValue}
                    type="button"
                    onClick={() => handleSelect(option)}
                    className={`block w-full px-4 py-3 text-left font-serif text-base transition-colors sm:text-lg ${
                      isSelected
                        ? "bg-[#eaf2fb] text-[#2F5F98] font-semibold"
                        : "text-[#597fad] hover:bg-[#eaf2fb]"
                    }`}
                  >
                    {getOptionLabel(option)}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* Validation error */}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
