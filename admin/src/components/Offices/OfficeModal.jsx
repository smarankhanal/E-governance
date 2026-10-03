import React, { useState } from "react";
import { FiX } from "react-icons/fi";

import IconButton from "../Common/IconButton";
import OfficeField from "./OfficeField";

const PROVINCES = [
  "Koshi",
  "Madhesh",
  "Bagmati",
  "Gandaki",
  "Lumbini",
  "Karnali",
  "Sudurpashchim",
];

const EMPTY = {
  name: "",
  code: "",
  province: "Bagmati",
  district: "",
  address: "",
  phone: "",
  head: "",
  capacity: 200,
  hours: "10:00 – 17:00",
  active: true,
};

const inputCls =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#0e9fb0] focus:outline-none focus:ring-2 focus:ring-[#0e9fb0]/20";

export default function OfficeModal({ office, onClose, onSave }) {
  const [form, setForm] = useState(office ?? EMPTY);
  const [error, setError] = useState("");

  const set = (key) => (e) => {
    setForm({
      ...form,
      [key]: e.target.value,
    });
  };

  const submit = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.code.trim() || !form.district.trim()) {
      setError("Office name, code and district are required.");
      return;
    }

    onSave({
      ...form,
      capacity: Number(form.capacity) || 0,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-slate-900/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="office-modal-title"
      onClick={onClose}
    >
      <form
        onSubmit={submit}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-2xl bg-white shadow-xl"
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <h2
            id="office-modal-title"
            className="text-lg font-semibold text-slate-900"
          >
            {office ? "Edit office" : "Add office"}
          </h2>

          <IconButton label="Close" onClick={onClose}>
            <FiX size={18} />
          </IconButton>
        </div>

        <div className="grid grid-cols-2 gap-4 px-6 py-5">
          <div className="col-span-2 sm:col-span-1">
            <OfficeField label="Office name">
              <input
                className={inputCls}
                value={form.name}
                onChange={set("name")}
                placeholder="Pokhara District Office"
              />
            </OfficeField>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <OfficeField label="Office code">
              <input
                className={inputCls}
                value={form.code}
                onChange={set("code")}
                placeholder="DAO-PKR"
              />
            </OfficeField>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <OfficeField label="Province">
              <select
                className={inputCls}
                value={form.province}
                onChange={set("province")}
              >
                {PROVINCES.map((province) => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
              </select>
            </OfficeField>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <OfficeField label="District">
              <input
                className={inputCls}
                value={form.district}
                onChange={set("district")}
                placeholder="Kaski"
              />
            </OfficeField>
          </div>

          <div className="col-span-2">
            <OfficeField label="Address">
              <input
                className={inputCls}
                value={form.address}
                onChange={set("address")}
                placeholder="Street, city"
              />
            </OfficeField>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <OfficeField label="Phone">
              <input
                className={inputCls}
                value={form.phone}
                onChange={set("phone")}
                placeholder="061-520333"
              />
            </OfficeField>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <OfficeField label="Office head">
              <input
                className={inputCls}
                value={form.head}
                onChange={set("head")}
                placeholder="Full name"
              />
            </OfficeField>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <OfficeField label="Opening hours">
              <input
                className={inputCls}
                value={form.hours}
                onChange={set("hours")}
              />
            </OfficeField>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <OfficeField label="Daily capacity">
              <input
                type="number"
                min="0"
                className={inputCls}
                value={form.capacity}
                onChange={set("capacity")}
              />
            </OfficeField>
          </div>

          {error && <p className="col-span-2 text-sm text-rose-600">{error}</p>}
        </div>

        <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-lg bg-[#17385f] px-4 py-2 text-sm font-medium text-white hover:bg-[#1d4777] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0e9fb0] focus-visible:ring-offset-2"
          >
            {office ? "Save changes" : "Add office"}
          </button>
        </div>
      </form>
    </div>
  );
}
