import React from "react";
import Logo from "../Common/Logo";

export default function Footer() {
  return (
    <footer className="bottom-0 w-full border-t border-gray-200 bg-white px-6 py-5">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 sm:flex-row">
        {/* Logo */}
        <Logo />

        {/* Copyright & Version */}
        <div className="flex flex-col items-center gap-1 text-sm text-gray-500 sm:items-end">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="font-medium text-gray-700">E-governance</span>. All
            rights reserved.
          </p>

          <p className="text-xs text-gray-400">Version 1.0.0</p>
        </div>
      </div>
    </footer>
  );
}
