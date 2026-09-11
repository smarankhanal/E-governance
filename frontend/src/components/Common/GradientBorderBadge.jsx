import React from "react";

export default function GradientBorderCard({ children }) {
  return (
    <div
      className="
        rounded-3xl
        bg-[linear-gradient(to_bottom,var(--color-primary)_0%,transparent_35%)]
        p-1.5
      "
    >
      <div className="rounded-3xl bg-gray-100 p-10">{children}</div>
    </div>
  );
}
