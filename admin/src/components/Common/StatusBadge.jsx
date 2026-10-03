import React from "react";
const STATUS_STYLES = {
  Pending: "bg-amber-50 text-amber-700 ring-amber-600/20",
  "In Review": "bg-sky-50 text-sky-700 ring-sky-600/20",
  Approved: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  Confirmed: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  Verified: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  Rejected: "bg-rose-50 text-rose-700 ring-rose-600/20",
  Cancelled: "bg-slate-100 text-slate-600 ring-slate-500/20",
  "Needs review": "bg-amber-50 text-amber-700 ring-amber-600/20",
};
export default function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${
        STATUS_STYLES[status] ?? "bg-slate-100 text-slate-600 ring-slate-500/20"
      }`}
    >
      {status}
    </span>
  );
}
