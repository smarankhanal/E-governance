import React, { useState } from "react";
import {
  FiBell,
  FiChevronDown,
  FiMenu,
  FiSettings,
  FiUser,
  FiLogOut,
} from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Navbar({ onMenuClick }) {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 h-20 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left Side */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu */}
          <button
            type="button"
            onClick={onMenuClick}
            className="rounded-xl border border-slate-200 p-2.5 text-slate-600 transition hover:bg-slate-50 lg:hidden"
          >
            <FiMenu size={20} />
          </button>

          <div>
            <p className="text-xs text-slate-500">Administration</p>
            <h1 className="text-lg font-semibold text-[#294e78]">
              Passport Services
            </h1>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Notification */}
          <button
            type="button"
            className="relative rounded-xl p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-[#2F5F98]"
          >
            <FiBell size={20} />

            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#009DAC]" />
          </button>

          {/* Profile */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-3 rounded-xl p-1.5 transition hover:bg-slate-50"
            >
              {/* Avatar */}
              <div className="grid h-9 w-9 place-items-center rounded-full bg-[#2F5F98] text-sm font-semibold text-white">
                AD
              </div>

              {/* User Information */}
              <div className="hidden text-left sm:block">
                <p className="text-sm font-semibold text-slate-700">
                  Administrator
                </p>

                <p className="text-xs text-slate-500">Super Admin</p>
              </div>

              <FiChevronDown
                size={16}
                className={`hidden text-slate-400 transition-transform sm:block ${
                  profileOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown */}
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
                {/* Profile */}
                <Link
                  to="/admin/settings"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-[#2F5F98]"
                >
                  <FiUser size={17} />

                  <span>Profile</span>
                </Link>

                {/* Settings */}
                <Link
                  to="/admin/settings"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-[#2F5F98]"
                >
                  <FiSettings size={17} />

                  <span>Settings</span>
                </Link>

                <div className="my-1 border-t border-slate-100" />

                {/* Logout */}
                <button
                  type="button"
                  onClick={() => {
                    setProfileOpen(false);
                    // Add logout logic here
                  }}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-600 transition hover:bg-red-50"
                >
                  <FiLogOut size={17} />

                  <span>Sign out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
