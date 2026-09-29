import React from "react";

export default function Button({
  children = "Register",
  logo: Logo,
  type = "button",
  onClick,
  className = "",
  disabled = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`flex relative w-full items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-base font-semibold text-text-on-primary shadow-md transition-all duration-200 hover:bg-primary-hover hover:shadow-lg active:scale-[0.98] cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
    >
      {Logo && (
        <Logo className="absolute left-15 text-xl text-text-on-primary" />
      )}

      <span>{children}</span>
    </button>
  );
}
