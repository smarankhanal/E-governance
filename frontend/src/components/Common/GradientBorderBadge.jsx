import React from "react";

export default function GradientBorderCard({ children }) {
  return (
    <div
      className="
        rounded-3xl
        bg-linear-to-b from-primary from-0% to-transparent to-35%l
        p-1.5
      "
    >
      <div className="rounded-3xl bg-gray-100 p-10">{children}</div>
    </div>
  );
}
