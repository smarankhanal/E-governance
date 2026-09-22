import React from "react";
import { MdInfoOutline } from "react-icons/md";

export default function InfoAlert({ text, className }) {
  return (
    <div
      className={`mt-8 flex items-center justify-center gap-2 rounded-lg bg-[#e5f0ff] px-4 py-5 text-center text-[#2874e8] sm:mt-12 ${className}`}
    >
      <MdInfoOutline className="h-6 w-6 shrink-0" />

      <p className="font-serif">{text}</p>
    </div>
  );
}
