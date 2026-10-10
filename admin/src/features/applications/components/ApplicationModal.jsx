import { useState } from "react";
import { FiEdit2, FiX } from "react-icons/fi";

import ApplicationField from "./ApplicationField";
import ApplicationSection from "./ApplicationSection";
import ApplicationDocumentList from "./ApplicationDocumentList";
import ApplicationBadge from "./ApplicationBadge";
import ApplicationIconButton from "./ApplicationIconButton";

import {
  STATUSES,
  STATUS_STYLES,
  TYPE_STYLES,
  SECTIONS,
} from "../config/applicationConfig";

import {
  getPath,
  setPath,
  fullName,
  initials,
  applicationType,
  hasAnyValue,
} from "../utils/applicationUtils";

export default function ApplicationModal({
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

  const update = (path) => (value) =>
    setDraft((previous) => setPath(previous, path, value));

  const updateDocStatus = (key) => (index, status) => {
    setDraft((previous) => ({
      ...previous,
      [key]: (previous[key] ?? []).map((document, i) =>
        i === index ? { ...document, status } : document,
      ),
    }));
  };

  const cancelEdit = () => {
    setDraft(structuredClone(application));
    setError("");
    setEdit(false);
  };

  const save = () => {
    const person = draft.personalDetails.personal;

    if (!person.givenName?.trim() || !person.surname?.trim()) {
      setError("Enter the given name and surname.");
      return;
    }

    const emails = [draft.contact?.email, draft.appointment?.email].filter(
      Boolean,
    );

    if (emails.some((email) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
      setError("Enter a valid email address.");
      return;
    }

    setError("");
    onSave(draft);
    setEdit(false);
  };

  const visibleSections = SECTIONS.filter(
    (section) =>
      edit || !section.optional || hasAnyValue(current, section.fields),
  );

  const scrollToSection = (title) => {
    const id = `modal-section-${title.toLowerCase().replace(/\s+/g, "-")}`;
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setActiveSection(title);
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
        onClick={(event) => event.stopPropagation()}
        className="flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl"
      >
        {" "}
        <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-6 py-4">
          {" "}
          <div className="flex items-center gap-3">
            {" "}
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#0e9fb0] text-base font-semibold text-white">
              {initials(fullName(current))}{" "}
            </div>
            <div>
              <h2
                id="application-modal-title"
                className="text-lg font-semibold text-slate-900"
              >
                {edit ? `Edit ${fullName(current)}` : fullName(current)}
              </h2>

              <div className="mt-1 flex flex-wrap items-center gap-2">
                <ApplicationBadge className={TYPE_STYLES[type]}>
                  {type}
                </ApplicationBadge>

                {edit && canChangeStatus ? (
                  <select
                    aria-label="Application status"
                    className="w-auto rounded-lg border border-slate-200 bg-white px-3 py-1 text-sm"
                    value={draft.status}
                    onChange={(event) =>
                      setDraft((previous) => ({
                        ...previous,
                        status: event.target.value,
                      }))
                    }
                  >
                    {STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                ) : (
                  <ApplicationBadge
                    className={STATUS_STYLES[current.status] ?? ""}
                  >
                    {current.status}
                  </ApplicationBadge>
                )}

                <span className="text-xs text-slate-500">{idLabel}</span>
              </div>
            </div>
          </div>
          <ApplicationIconButton label="Close" onClick={onClose}>
            <FiX size={18} />
          </ApplicationIconButton>
        </div>
        <div className="flex min-h-0 flex-1">
          <aside className="hidden w-56 shrink-0 overflow-y-auto border-r border-slate-200 bg-slate-50 p-3 md:block">
            <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
              User Details
            </p>

            <nav className="space-y-1">
              {[
                ...visibleSections.map((section) => section.title),
                "Documents",
                "Additional Documents",
              ].map((title) => (
                <button
                  key={title}
                  type="button"
                  onClick={() => scrollToSection(title)}
                  className={`w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium transition ${
                    activeSection === title
                      ? "bg-[#eaf2fb] text-[#2F5F98]"
                      : "text-slate-600 hover:bg-white hover:text-[#2F5F98]"
                  }`}
                >
                  {title}
                </button>
              ))}
            </nav>
          </aside>

          <div
            id="application-modal-content"
            className="min-w-0 flex-1 overflow-y-auto px-6 py-5"
          >
            <div className="space-y-8">
              {visibleSections.map((section) => (
                <section
                  key={section.title}
                  id={`modal-section-${section.title.toLowerCase().replace(/\s+/g, "-")}`}
                  className="scroll-mt-6"
                  onMouseEnter={() => setActiveSection(section.title)}
                >
                  <ApplicationSection title={section.title}>
                    <dl className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
                      {section.fields.map((field) => (
                        <ApplicationField
                          key={field.path}
                          field={field}
                          edit={edit}
                          value={getPath(current, field.path)}
                          onChange={update(field.path)}
                        />
                      ))}
                    </dl>
                  </ApplicationSection>
                </section>
              ))}

              <section
                id="modal-section-documents"
                className="scroll-mt-6"
                onMouseEnter={() => setActiveSection("Documents")}
              >
                <ApplicationDocumentList
                  title="Documents"
                  items={current.documents}
                  edit={edit}
                  onStatusChange={updateDocStatus("documents")}
                />
              </section>

              <section
                id="modal-section-additional-documents"
                className="scroll-mt-6"
                onMouseEnter={() => setActiveSection("Additional Documents")}
              >
                <ApplicationDocumentList
                  title="Additional Documents"
                  items={current.additionalDocuments}
                  edit={edit}
                  onStatusChange={updateDocStatus("additionalDocuments")}
                />
              </section>
            </div>
          </div>
        </div>
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
                  className="rounded-lg bg-[#17385f] px-4 py-2 text-sm font-medium text-white hover:bg-[#1d4777] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0e9fb0]"
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
                  className="inline-flex items-center gap-2 rounded-lg bg-[#17385f] px-4 py-2 text-sm font-medium text-white hover:bg-[#1d4777] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0e9fb0]"
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
