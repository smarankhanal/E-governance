import React from "react";
import { RiBriefcaseLine } from "react-icons/ri";

export default function UseCaseBadge({ label = "NEW" }) {
  return (
    <div className="inline-flex w-50 items-center gap-2 bg-blue-50 rounded-full pl-3 pr-4 py-1.5">
      <RiBriefcaseLine size={16} className="text-blue-500" strokeWidth={2} />
      <span className="text-blue-500 text-sm font-medium">
        Use case: <span className="text-blue-700 font-bold">{label}</span>
      </span>
    </div>
  );
}
