import React from "react";

export default function AnchorTag({ text, href }) {
  return (
    <a
      href={href}
      className="
        inline-block
        rounded-lg
        px-3 py-2
        text-lg
        text-gray-600
        font-medium
        transition-all duration-200
        hover:bg-white/10
        hover:backdrop-blur-md
        hover:shadow-[0_0_10px_rgba(255,255,255,0.08)]
      
      "
    >
      {text}
    </a>
  );
}
