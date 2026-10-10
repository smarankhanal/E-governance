import React from "react";
import { FiHome, FiCheckCircle, FiPauseCircle } from "react-icons/fi";

export default function OfficeStats({
  totalOffices,
  activeCount,
  totalCapacity,
}) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4">
        <div className="grid h-11 w-11 place-items-center rounded-lg bg-slate-100 text-slate-600">
          <FiHome size={20} />
        </div>

        <div>
          <p className="text-sm text-slate-500">Total offices</p>
          <p className="text-2xl font-semibold text-slate-900">
            {totalOffices}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4">
        <div className="grid h-11 w-11 place-items-center rounded-lg bg-emerald-50 text-emerald-600">
          <FiCheckCircle size={20} />
        </div>

        <div>
          <p className="text-sm text-slate-500">Accepting applicants</p>
          <p className="text-2xl font-semibold text-slate-900">{activeCount}</p>
        </div>
      </div>

      <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4">
        <div className="grid h-11 w-11 place-items-center rounded-lg bg-[#0e9fb0]/10 text-[#0e9fb0]">
          <FiPauseCircle size={20} />
        </div>

        <div>
          <p className="text-sm text-slate-500">Combined daily capacity</p>
          <p className="text-2xl font-semibold text-slate-900">
            {totalCapacity.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
