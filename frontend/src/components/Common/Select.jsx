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
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedValue, setSelectedValue] = useState(value);

  const searchInputRef = useRef(null);
  const selectRef = useRef(null);

  // Keep internal value synchronized with React Hook Form
  useEffect(() => {
    setSelectedValue(value ?? "");
  }, [value]);

  // Make sure options is always an array
  const safeOptions = Array.isArray(options) ? options : [];

  // Get the label displayed for an option
  const getOptionLabel = (option) => {
    if (typeof option === "string") {
      return option;
    }

    return option?.name?.en || option?.name || option?.label || "";
  };

  // Get the value stored in React Hook Form
  const getOptionValue = (option) => {
    if (typeof option === "string") {
      return option;
    }
    return option?.name.en ?? option?.id ?? "";
  };

  // Filter options
  const filteredOptions = safeOptions.filter((option) =>
    getOptionLabel(option).toLowerCase().includes(search.toLowerCase()),
  );

  // Find selected option
  const selectedOption = safeOptions.find(
    (option) => getOptionValue(option) === selectedValue,
  );

  // Display selected option label
  const selectedLabel = selectedOption ? getOptionLabel(selectedOption) : "";
  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchable) {
      searchInputRef.current?.focus();
    }
  }, [isOpen, searchable]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearch("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Select an option
  const handleSelect = (option) => {
    const newValue = getOptionValue(option);

    setSelectedValue(newValue);

    // Controller expects the value directly
    onChange?.(newValue);

    onBlur?.();

    setSearch("");
    setIsOpen(false);
  };

  // Clear selected option
  const handleClear = (event) => {
    event.stopPropagation();

    setSelectedValue("");

    // Controller expects an empty value
    onChange?.("");

    onBlur?.();

    setSearch("");
    setIsOpen(false);
  };

  // Toggle dropdown
  const handleToggle = () => {
    if (disabled) return;

    setIsOpen((prev) => !prev);
    setSearch("");
  };

  return (
    <div ref={selectRef} className="relative mx-2 flex flex-col gap-2">
      {/* Label */}
      {label && (
        <label
          htmlFor={name}
          className={`font-serif text-xl text-[#294e78] ${labelClassName}`}
        >
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
        id={name}
        type="button"
        disabled={disabled}
        onClick={handleToggle}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`flex h-13 w-full items-center justify-between rounded-lg border bg-white px-3 font-serif text-left transition-all duration-200 hover:border-[#009DAC] focus:outline-none focus:ring-1 focus:ring-[#009DAC] sm:text-lg ${
          error ? "border-red-500 bg-red-50" : "border-[#ccd3db]"
        } ${
          disabled
            ? "cursor-not-allowed bg-gray-100 text-gray-400"
            : "cursor-pointer"
        } ${
          isOpen ? "border-[#009DAC] ring-1 ring-[#009DAC]" : ""
        } ${className}`}
      >
        {/* Selected value / placeholder */}
        <span className={selectedLabel ? "text-[#597fad]" : "text-[#8c9299]"}>
          {selectedLabel || placeholder}
        </span>

        {/* Icons */}
        <div className="flex items-center">
          {selectedValue && !disabled && (
            <span
              role="button"
              tabIndex={0}
              aria-label="Clear selection"
              onClick={handleClear}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  handleClear(event);
                }
              }}
              className="mr-2 cursor-pointer text-[#707985] hover:text-[#34404d]"
            >
              <MdClose className="h-6 w-6" />
            </span>
          )}

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
          <div className="max-h-60 overflow-y-auto" role="listbox">
            {filteredOptions.length === 0 ? (
              <div className="px-4 py-4 font-serif text-[#8c9299]">
                No options found
              </div>
            ) : (
              filteredOptions.map((option) => {
                const optionValue = getOptionValue(option);
                const optionLabel = getOptionLabel(option);
                const isSelected = optionValue === selectedValue;

                return (
                  <button
                    key={optionValue}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(option)}
                    className={`block w-full px-4 py-3 text-left font-serif text-base transition-colors sm:text-lg ${
                      isSelected
                        ? "bg-[#eaf2fb] font-semibold text-[#2F5F98]"
                        : "text-[#597fad] hover:bg-[#eaf2fb]"
                    }`}
                  >
                    {optionLabel}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* Validation error */}
      {error && <p className="font-serif text-sm text-red-500">{error}</p>}
    </div>
  );
}
