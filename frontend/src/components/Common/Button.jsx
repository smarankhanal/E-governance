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
      className={`flex relative w-full items-center justify-center gap-2 rounded-md bg-[#2F5F98] px-6 py-3 text-base font-semibold text-white shadow-md transition-all duration-200 hover:bg-[#254D7D] hover:shadow-lg active:scale-[0.98] cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
    >
      {Logo && <Logo className="absolute left-15 text-xl text-white" />}

      <span>{children}</span>
    </button>
  );
}
