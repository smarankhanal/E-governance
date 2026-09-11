import React from "react";
import Button from "./Button";

export default function Input({
  type = "text",
  placeholder = "",
  label,
  required = false,
  error,
  ...props
}) {
  return (
    <div className="flex flex-col gap-2 mx-2">
      {label && (
        <label className="text-lg font-medium text-[#495070]">
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
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full outline-none rounded-md border border-gray-200 bg-white px-4 py-3 text-gray-700  placeholder:text-gray-400   ${
          error
            ? "border-red-500 bg-red-50 focus:border-red-500 focus:ring-1 focus:ring-red-500"
            : "border-slate-300 bg-white focus:border-[#009DAC] focus:ring-1 focus:ring-[#009DAC]"
        }`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
