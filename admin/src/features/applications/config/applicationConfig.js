// Application statuses
export const STATUSES = ["Pending", "Approved", "Rejected"];

// Application types
export const TYPES = ["New", "Minor", "Renewal", "Lost/Stolen"];

// Dropdown options
export const GENDERS = ["Male", "Female", "Other"];

export const PROXIES = [
  "",
  "Father",
  "Mother",
  "Son",
  "Daughter",
  "Spouse",
  "Other",
];

export const DOC_STATUSES = ["pending", "verified", "rejected"];

// Application status styles
export const STATUS_STYLES = {
  Pending: "bg-amber-50 text-amber-700 ring-amber-600/20",
  Approved: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  Rejected: "bg-rose-50 text-rose-700 ring-rose-600/20",
};
export const SECTIONS = [
  { id: "personalDetails", label: "Personal Details" },
  { id: "previousDocument", label: "Previous Document" },
  { id: "address", label: "Address" },
  { id: "appointment", label: "Appointment" },
  { id: "documents", label: "Documents" },
];
// Application type styles
export const TYPE_STYLES = {
  New: "bg-sky-50 text-sky-700 ring-sky-600/20",
  Minor: "bg-violet-50 text-violet-700 ring-violet-600/20",
  Renewal: "bg-teal-50 text-teal-700 ring-teal-600/20",
  "Lost/Stolen": "bg-orange-50 text-orange-700 ring-orange-600/20",
};

// Document status styles
export const DOC_STYLES = {
  verified: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  pending: "bg-amber-50 text-amber-700 ring-amber-600/20",
  rejected: "bg-rose-50 text-rose-700 ring-rose-600/20",
};

// Shared input styling
export const inputCls =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#0e9fb0] focus:outline-none focus:ring-2 focus:ring-[#0e9fb0]/20";
