import React, { useState } from "react";
import Logo from "../Common/Logo";
import AnchorTag from "../Common/AnchorTag";
import { FaBars, FaTimes, FaUniversalAccess } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    {
      text: "Home",
      path: "/",
    },
    {
      text: "FAQ",
      path: "/faq",
    },
  ];

  return (
    <nav className="w-full border-b border-gray-200">
      {/* Main Navbar */}
      <div className="flex items-center justify-between px-5 py-3 md:px-10">
        {/* Logo  + Button */}
        <div className="flex gap-4">
          <Logo />
          <div className="hidden gap-8 md:flex">
            {navLinks.map((link) => (
              <AnchorTag key={link.path} text={link.text} href={link.path} />
            ))}
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-2xl md:hidden"
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/*  Sign In */}
        <div className=" items-center gap-3 flex">
          <FaUniversalAccess className="text-xl" />

          <AnchorTag text="Sign in" to="/login" />
        </div>

        {/* Mobile Menu Button */}
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="flex flex-col gap-4 border-t border-gray-200 px-5 py-4 md:hidden">
          {navLinks.map((link) => (
            <AnchorTag key={link.path} text={link.text} href={link.path} />
          ))}
        </div>
      )}
    </nav>
  );
}
