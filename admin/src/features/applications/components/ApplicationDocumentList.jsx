import { FiFileText } from "react-icons/fi";
import ApplicationBadge from "./ApplicationBadge";
import ApplicationSection from "./ApplicationSection";
import {
  DOC_STATUSES,
  DOC_STYLES,
  inputCls,
} from "../config/applicationConfig";

export default function ApplicationDocumentList({
  title,
  items = [],
  edit,
  onStatusChange,
}) {
  return (
    <ApplicationSection title={title}>
      {items.length === 0 ? (
        <p className="text-sm text-slate-500">No documents uploaded.</p>
      ) : (
        <ul className="divide-y divide-slate-100">
          {items.map((document, index) => (
            <li
              key={document.id ?? `${document.name}-${index}`}
              className="flex flex-wrap items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
            >
              {" "}
              <div className="flex items-center gap-3">
                {" "}
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-slate-100 text-slate-500">
                  {" "}
                  <FiFileText size={16} />{" "}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    {document.name}
                    {document.required && (
                      <span className="text-rose-600"> *</span>
                    )}
                  </p>

                  <p className="text-xs text-slate-500">{document.fileName}</p>
                </div>
              </div>
              {edit ? (
                <select
                  aria-label={`Status of ${document.name}`}
                  className={`${inputCls} w-auto`}
                  value={document.status}
                  onChange={(event) =>
                    onStatusChange(index, event.target.value)
                  }
                >
                  {DOC_STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {status[0].toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              ) : (
                <ApplicationBadge
                  className={DOC_STYLES[document.status] ?? DOC_STYLES.pending}
                >
                  {document.status}
                </ApplicationBadge>
              )}
            </li>
          ))}
        </ul>
      )}
    </ApplicationSection>
  );
}
