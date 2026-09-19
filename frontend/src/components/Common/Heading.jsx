import React from "react";

export default function Heading({ text }) {
  return (
    <div className="text-center">
      <h3 className="font-serif text-left text-[#495057] font-weight:600 text-xl">
        {text}
      </h3>

      <div className="mt-4 h-1 w-full bg-[#37659a]" />
    </div>
  );
}
