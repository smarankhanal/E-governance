import React from "react";
import { RxCross2 } from "react-icons/rx";

export default function CancelButton({ ...props }) {
  return (
    <button
      type="button"
      className="flex items-center gap-1 font-serif text-lg text-red-600 transition hover:text-red-700 sm:text-xl"
      {...props}
    >
      <RxCross2 className="h-6 w-6" />
      Cancel
    </button>
  );
}
