import React from "react";
import { FiLogOut } from "react-icons/fi";
export default function AdminInfo() {
  return (
    <>
      <div className="border-t border-white/10 p-4">
        <div className="mb-3 flex items-center gap-3 rounded-xl bg-white/5 p-3">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#009DAC] text-xs font-bold text-white">
            AD
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-white">
              Administrator
            </p>

            <p className="truncate text-xs text-blue-100/50">Super Admin</p>
          </div>
        </div>

        {/* Logout */}
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-blue-50/70 transition hover:bg-red-500/10 hover:text-red-300"
        >
          <FiLogOut size={18} />

          <span>Sign out</span>
        </button>
      </div>
    </>
  );
}
