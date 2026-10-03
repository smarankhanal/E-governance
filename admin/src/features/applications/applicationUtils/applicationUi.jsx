import { useState } from "react";
import { FiEdit2, FiX, FiFileText } from "react-icons/fi";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

export const STATUSES = ["Pending", "Approved", "Rejected"];
export const TYPES = ["New", "Minor", "Renewal", "Lost/Stolen"];
const GENDERS = ["Male", "Female", "Other"];
const PROXIES = ["", "Father", "Mother", "Son", "Daughter", "Spouse", "Other"];
const DOC_STATUSES = ["pending", "verified", "rejected"];

export const STATUS_STYLES = {
  Pending: "bg-amber-50 text-amber-700 ring-amber-600/20",
  Approved: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  Rejected: "bg-rose-50 text-rose-700 ring-rose-600/20",
};

export const TYPE_STYLES = {
  New: "bg-sky-50 text-sky-700 ring-sky-600/20",
  Minor: "bg-violet-50 text-violet-700 ring-violet-600/20",
  Renewal: "bg-teal-50 text-teal-700 ring-teal-600/20",
  "Lost/Stolen": "bg-orange-50 text-orange-700 ring-orange-600/20",
};

const DOC_STYLES = {
  verified: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  pending: "bg-amber-50 text-amber-700 ring-amber-600/20",
  rejected: "bg-rose-50 text-rose-700 ring-rose-600/20",
};

export const inputCls =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#0e9fb0] focus:outline-none focus:ring-2 focus:ring-[#0e9fb0]/20";

/* ------------------------------------------------------------------ */
/*  Form sections (drives both the details view and the edit form)     */
/*  type: text (default) | date (string) | dateObj (Date) | time       */
/*        | email | select (needs options)                             */
/* ------------------------------------------------------------------ */

function addressFields(root) {
  return [
    { label: "Country", path: `${root}.country` },
    { label: "Province", path: `${root}.provinceName` },
    { label: "District", path: `${root}.districtName` },
    { label: "Municipality", path: `${root}.municipalityName` },
    { label: "Ward", path: `${root}.ward` },
    { label: "Street", path: `${root}.street` },
    { label: "House number", path: `${root}.houseNumber` },
  ];
}

const SECTIONS = [
  {
    title: "Appointment",
    fields: [
      { label: "Province", path: "appointment.provinceName" },
      { label: "District", path: "appointment.districtName" },
      { label: "Office", path: "appointment.locationName" },
      { label: "Date", path: "appointment.appointmentDate", type: "dateObj" },
      { label: "Time", path: "appointment.appointmentTime", type: "time" },
      { label: "Contact", path: "appointment.contact" },
      { label: "Email", path: "appointment.email", type: "email" },
    ],
  },
  {
    title: "Personal details",
    fields: [
      {
        label: "Given name",
        path: "personalDetails.personal.givenName",
        required: true,
      },
      {
        label: "Surname",
        path: "personalDetails.personal.surname",
        required: true,
      },
      {
        label: "Gender",
        path: "personalDetails.personal.gender",
        type: "select",
        options: GENDERS,
      },
      {
        label: "Date of birth (AD)",
        path: "personalDetails.personal.dateOfBirth_AD",
        type: "date",
      },
      {
        label: "Date of birth (BS)",
        path: "personalDetails.personal.dateOfBirth_BS",
      },
      { label: "National ID (NIN)", path: "personalDetails.personal.nin" },
      { label: "Nationality", path: "personalDetails.personal.nationality" },
      { label: "Country", path: "personalDetails.personal.country" },
      {
        label: "Place of birth",
        path: "personalDetails.personal.placeOfBirth",
      },
    ],
  },
  {
    title: "Citizenship",
    fields: [
      {
        label: "Citizenship no.",
        path: "personalDetails.citizenshipDetail.citizenship",
      },
      { label: "Minor ID", path: "personalDetails.citizenshipDetail.minorId" },
      {
        label: "Issue country",
        path: "personalDetails.citizenshipDetail.issueCountry",
      },
      {
        label: "Issue district",
        path: "personalDetails.citizenshipDetail.issueDistrict",
      },
      {
        label: "Issue date (AD)",
        path: "personalDetails.citizenshipDetail.issueDate_AD",
        type: "date",
      },
    ],
  },
  {
    title: "Parents",
    fields: [
      { label: "Mother's name", path: "personalDetails.parental.motherName" },
      {
        label: "Mother's surname",
        path: "personalDetails.parental.motherSurname",
      },
      { label: "Father's name", path: "personalDetails.parental.fatherName" },
      {
        label: "Father's surname",
        path: "personalDetails.parental.fatherSurname",
      },
    ],
  },
  {
    title: "Contact",
    fields: [
      { label: "Phone number", path: "contact.phoneNumber" },
      { label: "Email", path: "contact.email", type: "email" },
    ],
  },
  { title: "Residential address", fields: addressFields("residentialAddress") },
  {
    title: "Temporary address",
    optional: true,
    fields: addressFields("temporaryAddress"),
  },
  {
    title: "Proxy",
    optional: true,
    fields: [
      {
        label: "Relationship",
        path: "proxyDetails.proxy",
        type: "select",
        options: PROXIES,
      },
      { label: "First name", path: "proxyDetails.firstName" },
      { label: "Surname", path: "proxyDetails.surname" },
    ],
  },
  {
    title: "Previous passport",
    optional: true,
    fields: [
      { label: "Passport number", path: "previousDocument.passportNumber" },
      {
        label: "Date of issue",
        path: "previousDocument.dateOfIssue",
        type: "dateObj",
      },
      { label: "Place of issue", path: "previousDocument.placeOfIssue" },
      {
        label: "Date of expiry",
        path: "previousDocument.dateOfExpiry",
        type: "dateObj",
      },
    ],
  },
  {
    title: "Lost or stolen passport",
    optional: true,
    fields: [
      {
        label: "Document number",
        path: "lostStolenPassport.latestDocumentNumber",
      },
      { label: "Country of theft", path: "lostStolenPassport.countryOfTheft" },
      {
        label: "Date of theft",
        path: "lostStolenPassport.dateOfTheft",
        type: "date",
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const getPath = (obj, path) =>
  path.split(".").reduce((o, k) => (o == null ? o : o[k]), obj);

const setPath = (obj, path, value) => {
  const [head, ...rest] = path.split(".");
  return {
    ...obj,
    [head]: rest.length
      ? setPath(obj[head] ?? {}, rest.join("."), value)
      : value,
  };
};

export const toInputDate = (v) => {
  if (!v) return "";
  if (v instanceof Date)
    return Number.isNaN(v.getTime()) ? "" : v.toISOString().slice(0, 10);
  return String(v);
};

const displayValue = (v, type) => {
  if (v === "" || v == null) return "—";
  if (type === "dateObj" || type === "date") return toInputDate(v) || "—";
  return String(v);
};

export const initials = (name) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

export const fullName = (a) =>
  `${a.personalDetails.personal.givenName} ${a.personalDetails.personal.surname}`.trim();

export const applicationType = (a) => {
  if (a.lostStolenPassport?.latestDocumentNumber) return "Lost/Stolen";
  if (a.personalDetails.citizenshipDetail?.minorId) return "Minor";
  if (a.previousDocument?.passportNumber) return "Renewal";
  return "New";
};

const hasAnyValue = (app, fields) =>
  fields.some((f) => {
    const v = getPath(app, f.path);
    return v !== "" && v != null;
  });

/* ------------------------------------------------------------------ */
/*  Small pieces                                                       */
/* ------------------------------------------------------------------ */

export function Badge({ children, className }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ring-1 ring-inset ${className}`}
    >
      {children}
    </span>
  );
}

export function IconButton({ label, onClick, danger, children }) {
  return (
    <button
      aria-label={label}
      title={label}
      onClick={onClick}
      className={`rounded-md p-2 text-slate-500 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0e9fb0] ${
        danger
          ? "hover:bg-rose-50 hover:text-rose-600"
          : "hover:bg-slate-100 hover:text-[#17385f]"
      }`}
    >
      {children}
    </button>
  );
}

function Field({ field, value, edit, onChange }) {
  const { label, type = "text", options, required } = field;

  if (!edit) {
    return (
      <div>
        <dt className="text-xs font-medium text-slate-500">{label}</dt>
        <dd className="mt-0.5 text-sm text-slate-900">
          {displayValue(value, type)}
        </dd>
      </div>
    );
  }

  const id = `f-${field.path}`;
  let control;

  if (type === "select") {
    control = (
      <select
        id={id}
        className={inputCls}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o || "None"}
          </option>
        ))}
      </select>
    );
  } else if (type === "dateObj") {
    control = (
      <input
        id={id}
        type="date"
        className={inputCls}
        value={toInputDate(value)}
        onChange={(e) =>
          onChange(e.target.value ? new Date(e.target.value) : null)
        }
      />
    );
  } else {
    const htmlType =
      { date: "date", time: "time", email: "email" }[type] ?? "text";
    control = (
      <input
        id={id}
        type={htmlType}
        className={inputCls}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1 block text-sm font-medium text-slate-700"
      >
        {label}
        {required && <span className="text-rose-600"> *</span>}
      </label>
      {control}
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="rounded-xl border border-slate-200">
      <h3 className="border-b border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-[#17385f]">
        {title}
      </h3>
      <div className="p-5">{children}</div>
    </section>
  );
}

function DocumentList({ title, items, edit, onStatusChange }) {
  return (
    <Section title={title}>
      {items.length === 0 ? (
        <p className="text-sm text-slate-500">No documents uploaded.</p>
      ) : (
        <ul className="divide-y divide-slate-100">
          {items.map((d, i) => (
            <li
              key={d.id}
              className="flex flex-wrap items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-slate-100 text-slate-500">
                  <FiFileText size={16} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    {d.name}
                    {d.required && <span className="text-rose-600"> *</span>}
                  </p>
                  <p className="text-xs text-slate-500">{d.fileName}</p>
                </div>
              </div>
              {edit ? (
                <select
                  aria-label={`Status of ${d.name}`}
                  className={`${inputCls} w-auto`}
                  value={d.status}
                  onChange={(e) => onStatusChange(i, e.target.value)}
                >
                  {DOC_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s[0].toUpperCase() + s.slice(1)}
                    </option>
                  ))}
                </select>
              ) : (
                <Badge className={DOC_STYLES[d.status]}>{d.status}</Badge>
              )}
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  Details / edit modal                                               */
/*                                                                     */
/*  idLabel            text shown next to the badges                   */
/*  canChangeStatus    show the status dropdown while editing          */
/* ------------------------------------------------------------------ */

export function ApplicationModal({
  application,
  startInEdit = false,
  idLabel,
  canChangeStatus = true,
  onClose,
  onSave,
}) {
  const [edit, setEdit] = useState(startInEdit);
  const [draft, setDraft] = useState(() => structuredClone(application));
  const [error, setError] = useState("");
  const [activeSection, setActiveSection] = useState("Personal Details");

  const current = edit ? draft : application;
  const type = applicationType(current);

  const update = (path) => (value) => setDraft((d) => setPath(d, path, value));

  const updateDocStatus = (key) => (index, status) =>
    setDraft((d) => ({
      ...d,
      [key]: d[key].map((doc, i) => (i === index ? { ...doc, status } : doc)),
    }));

  const cancelEdit = () => {
    setDraft(structuredClone(application));
    setError("");
    setEdit(false);
  };

  const save = () => {
    const p = draft.personalDetails.personal;

    if (!p.givenName.trim() || !p.surname.trim()) {
      setError("Enter the given name and surname.");
      return;
    }

    const emails = [draft.contact.email, draft.appointment.email].filter(
      Boolean,
    );

    if (emails.some((e) => !/^\S+@\S+\.\S+$/.test(e))) {
      setError("Enter a valid email address.");
      return;
    }

    setError("");
    onSave(draft);
    setEdit(false);
  };

  const visibleSections = SECTIONS.filter(
    (s) => edit || !s.optional || hasAnyValue(current, s.fields),
  );

  const scrollToSection = (title) => {
    const section = document.getElementById(
      `modal-section-${title.toLowerCase().replace(/\s+/g, "-")}`,
    );

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      setActiveSection(title);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-slate-900/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="application-modal-title"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl"
      >
        {/* Header */}
        <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#0e9fb0] text-base font-semibold text-white">
              {initials(fullName(current))}
            </div>

            <div>
              <h2
                id="application-modal-title"
                className="text-lg font-semibold text-slate-900"
              >
                {edit ? `Edit ${fullName(current)}` : fullName(current)}
              </h2>

              <div className="mt-1 flex flex-wrap items-center gap-2">
                <Badge className={TYPE_STYLES[type]}>{type}</Badge>

                {edit && canChangeStatus ? (
                  <select
                    aria-label="Application status"
                    className={`${inputCls} w-auto py-1`}
                    value={draft.status}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        status: e.target.value,
                      })
                    }
                  >
                    {STATUSES.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                ) : (
                  <Badge className={STATUS_STYLES[current.status]}>
                    {current.status}
                  </Badge>
                )}

                <span className="text-xs text-slate-500">{idLabel}</span>
              </div>
            </div>
          </div>

          <IconButton label="Close" onClick={onClose}>
            <FiX size={18} />
          </IconButton>
        </div>

        {/* Main content */}
        <div className="flex min-h-0 flex-1">
          {/* Side navigation */}
          <aside className="hidden w-56 shrink-0 overflow-y-auto border-r border-slate-200 bg-slate-50 p-3 md:block">
            <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
              User Details
            </p>

            <nav className="space-y-1">
              {visibleSections.map((section) => {
                const active = activeSection === section.title;

                return (
                  <button
                    key={section.title}
                    type="button"
                    onClick={() => scrollToSection(section.title)}
                    className={`w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium transition ${
                      active
                        ? "bg-[#eaf2fb] text-[#2F5F98]"
                        : "text-slate-600 hover:bg-white hover:text-[#2F5F98]"
                    }`}
                  >
                    {section.title}
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => scrollToSection("Documents")}
                className={`w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium transition ${
                  activeSection === "Documents"
                    ? "bg-[#eaf2fb] text-[#2F5F98]"
                    : "text-slate-600 hover:bg-white hover:text-[#2F5F98]"
                }`}
              >
                Documents
              </button>

              <button
                type="button"
                onClick={() => scrollToSection("Additional Documents")}
                className={`w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium transition ${
                  activeSection === "Additional Documents"
                    ? "bg-[#eaf2fb] text-[#2F5F98]"
                    : "text-slate-600 hover:bg-white hover:text-[#2F5F98]"
                }`}
              >
                Additional Documents
              </button>
            </nav>
          </aside>

          {/* Details */}
          <div
            id="application-modal-content"
            className="min-w-0 flex-1 overflow-y-auto px-6 py-5"
          >
            <div className="space-y-8">
              {visibleSections.map((s) => (
                <section
                  key={s.title}
                  id={`modal-section-${s.title
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  className="scroll-mt-6"
                  onMouseEnter={() => setActiveSection(s.title)}
                >
                  <Section title={s.title}>
                    <dl className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
                      {s.fields.map((f) => (
                        <Field
                          key={f.path}
                          field={f}
                          edit={edit}
                          value={getPath(current, f.path)}
                          onChange={update(f.path)}
                        />
                      ))}
                    </dl>
                  </Section>
                </section>
              ))}
              {/* Documents */}
              <section
                id="modal-section-documents"
                className="scroll-mt-6"
                onMouseEnter={() => setActiveSection("Documents")}
              >
                <DocumentList
                  title="Documents"
                  items={current.documents}
                  edit={edit}
                  onStatusChange={updateDocStatus("documents")}
                />
              </section>

              {/* Additional Documents */}
              <section
                id="modal-section-additional-documents"
                className="scroll-mt-6"
                onMouseEnter={() => setActiveSection("Additional Documents")}
              >
                <DocumentList
                  title="Additional Documents"
                  items={current.additionalDocuments}
                  edit={edit}
                  onStatusChange={updateDocStatus("additionalDocuments")}
                />
              </section>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-slate-200 px-6 py-4">
          <p className="text-sm text-rose-600" role="alert">
            {error}
          </p>

          <div className="flex gap-3">
            {edit ? (
              <>
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={save}
                  className="rounded-lg bg-[#17385f] px-4 py-2 text-sm font-medium text-white hover:bg-[#1d4777] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0e9fb0] focus-visible:ring-offset-2"
                >
                  Save changes
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Close
                </button>

                <button
                  type="button"
                  onClick={() => setEdit(true)}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#17385f] px-4 py-2 text-sm font-medium text-white hover:bg-[#1d4777] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0e9fb0] focus-visible:ring-offset-2"
                >
                  <FiEdit2 size={14} />
                  Edit details
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
