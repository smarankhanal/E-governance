export const getPath = (obj, path) =>
  path.split(".").reduce((value, key) => value?.[key], obj);

// Update a nested value without mutating the original object
export const setPath = (obj, path, value) => {
  const [head, ...rest] = path.split(".");

  return {
    ...obj,
    [head]: rest.length
      ? setPath(obj?.[head] ?? {}, rest.join("."), value)
      : value,
  };
};

// Convert a value to an HTML date input value (YYYY-MM-DD)
export const toInputDate = (value) => {
  if (!value) return "";

  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) return "";

    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, "0");
    const day = String(value.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const stringValue = String(value);

  return /^\d{4}-\d{2}-\d{2}$/.test(stringValue) ? stringValue : "";
};

// Format a value for read-only display
export const displayValue = (value, type) => {
  if (value === "" || value == null) return "—";

  if (type === "dateObj" || type === "date") {
    return toInputDate(value) || "—";
  }

  return String(value);
};

// Get initials from a full name
export const initials = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");

// Get the applicant's full name
export const fullName = (application) => {
  const personal = application?.personalDetails?.personal;

  return [personal?.givenName, personal?.surname]
    .filter(Boolean)
    .join(" ")
    .trim();
};

// Determine the application type
export const applicationType = (application) => {
  if (application?.lostStolenPassport?.latestDocumentNumber) {
    return "Lost/Stolen";
  }

  if (application?.personalDetails?.citizenshipDetail?.minorId) {
    return "Minor";
  }

  if (application?.previousDocument?.passportNumber) {
    return "Renewal";
  }

  return "New";
};

// Check whether at least one field in a section has a value
export const hasAnyValue = (application, fields) =>
  fields.some((field) => {
    const value = getPath(application, field.path);

    return (
      value !== "" &&
      value != null &&
      !(typeof value === "string" && value.trim() === "")
    );
  });
