import React from "react";
import {
  FiEdit2,
  FiTrash2,
  FiMapPin,
  FiPhone,
  FiUser,
  FiClock,
  FiHome,
} from "react-icons/fi";

import IconButton from "../Common/IconButton";
import Toggle from "../Common/Toggle";

export default function OfficeCard({ office, onEdit, onDelete, onToggle }) {
  return (
    <article
      className={`flex flex-col rounded-xl border bg-white p-5 transition ${
        office.active ? "border-slate-200" : "border-slate-200 opacity-75"
      }`}
    >
      <header className="flex items-start gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-[#17385f]/10 text-[#17385f]">
          <FiHome size={20} />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate font-semibold text-slate-900">
            {office.name}
          </h3>

          <p className="text-sm text-slate-500">{office.code}</p>
        </div>

        <Toggle
          checked={office.active}
          onChange={onToggle}
          label={`${office.active ? "Deactivate" : "Activate"} ${office.name}`}
        />
      </header>

      <dl className="mt-4 space-y-2.5 text-sm text-slate-600">
        <div className="flex items-start gap-2.5">
          <FiMapPin className="mt-0.5 shrink-0 text-slate-400" size={15} />

          <dd>
            {office.address}

            <span className="block text-slate-400">
              {office.district}, {office.province} Province
            </span>
          </dd>
        </div>

        <div className="flex items-center gap-2.5">
          <FiPhone className="shrink-0 text-slate-400" size={15} />
          <dd>{office.phone || "—"}</dd>
        </div>

        <div className="flex items-center gap-2.5">
          <FiUser className="shrink-0 text-slate-400" size={15} />
          <dd>{office.head || "No head assigned"}</dd>
        </div>

        <div className="flex items-center gap-2.5">
          <FiClock className="shrink-0 text-slate-400" size={15} />
          <dd>{office.hours}</dd>
        </div>
      </dl>

      <footer className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
        <div>
          <p className="text-xs text-slate-500">Daily capacity</p>

          <p className="font-semibold text-slate-900">
            {office.capacity.toLocaleString()} applicants
          </p>
        </div>

        <div className="flex gap-1">
          <IconButton label={`Edit ${office.name}`} onClick={onEdit}>
            <FiEdit2 size={16} />
          </IconButton>

          <IconButton label={`Delete ${office.name}`} danger onClick={onDelete}>
            <FiTrash2 size={16} />
          </IconButton>
        </div>
      </footer>
    </article>
  );
}
