import React from "react";
import { NavLink } from "react-router-dom";
import {
  FiBarChart2,
  FiBell,
  FiCalendar,
  FiChevronRight,
  FiClipboard,
  FiGrid,
  FiMapPin,
  FiSettings,
  FiUsers,
  FiX,
} from "react-icons/fi";
import { MdOutlineCollections } from "react-icons/md";

import AdminInfo from "../Common/Admin/AdminInfo";
import Logo from "../Common/Logo";

const navigationGroups = [
  {
    title: "Overview",
    items: [
      {
        label: "Dashboard",
        path: "/admin",
        icon: FiGrid,
      },
    ],
  },
  {
    title: "Management",
    items: [
      {
        label: "Applications",
        path: "/admin/applications",
        icon: FiClipboard,
      },
      {
        label: "Appointments",
        path: "/admin/appointments",
        icon: FiCalendar,
      },

      {
        label: "Users",
        path: "/admin/users",
        icon: FiUsers,
      },
      {
        label: "Collected",
        path: "/admin/collected",
        icon: MdOutlineCollections,
      },
      {
        label: "Offices",
        path: "/admin/offices",
        icon: FiMapPin,
      },
    ],
  },
  {
    title: "System",
    items: [
      {
        label: "Reports",
        path: "/admin/reports",
        icon: FiBarChart2,
      },
      {
        label: "Notifications",
        path: "/admin/notifications",
        icon: FiBell,
      },
      {
        label: "Settings",
        path: "/admin/settings",
        icon: FiSettings,
      },
    ],
  },
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          flex w-72 flex-col
          bg-[#173B5E]
          text-white
          shadow-xl
          transition-transform duration-200
         lg:translate-x-0
       ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* =========================
            LOGO / BRAND
        ========================== */}
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
          <div className="flex items-center gap-3">
            {/* Logo */}
            <Logo />

            {/* Brand */}
            <div>
              <p className="text-sm font-semibold">Passport Administration</p>

              <p className="text-xs text-blue-100/60">E-Governance Portal</p>
            </div>
          </div>

          {/* Close Mobile Sidebar */}
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-blue-100/70 transition hover:bg-white/10 hover:text-white lg:hidden"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* =========================
            NAVIGATION
        ========================== */}
        <nav className="sidebar-scrollbar flex-1 overflow-y-auto px-4 py-6">
          {navigationGroups.map((group) => (
            <div key={group.title} className="mb-7 last:mb-0">
              {/* Group Title */}
              <p className="mb-2 px-3 text-[11px] font-semibold uppercase  text-blue-100/40">
                {group.title}
              </p>

              {/* Group Items */}
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      end={item.path === "/"}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `
                        group
                        flex
                        items-center
                        justify-between
                        rounded-xl
                        px-3
                        py-3
                        text-sm
                        transition-all
                        duration-150
                        ${
                          isActive
                            ? "bg-white text-[#173B5E] shadow-sm"
                            : "text-blue-50/80 hover:bg-white/10 hover:text-white"
                        }
                        `
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {/* Left */}
                          <div className="flex items-center gap-3">
                            <Icon size={18} />

                            <span>{item.label}</span>
                          </div>

                          {/* Active Arrow */}
                          {isActive && (
                            <FiChevronRight
                              size={16}
                              className="text-[#2F5F98]"
                            />
                          )}
                        </>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
        {/* AdminInfo */}
        <AdminInfo />
      </aside>
    </>
  );
}
