import React, { useState } from "react";
import { useSelector } from "react-redux";
import Logo from "../Common/Logo";
import AnchorTag from "../Common/AnchorTag";
import { FaBars, FaTimes, FaUniversalAccess } from "react-icons/fa";
import UseCaseBadge from "../Common/UseCaseBadge";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const applicationType = useSelector(
    (state) => state.application.applicationType,
  );

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
        {/* Left Side */}
        <div className="flex items-center gap-4">
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <AnchorTag key={link.path} text={link.text} href={link.path} />
            ))}
            {applicationType && <UseCaseBadge label={applicationType.id} />}
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Sign In */}
          <div className="flex items-center gap-2">
            <FaUniversalAccess className="text-xl" />

            <AnchorTag text="Sign in" to="/login" />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-2xl md:hidden"
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="flex flex-col gap-4 border-t border-gray-200 px-5 py-4 md:hidden">
          {navLinks.map((link) => (
            <AnchorTag key={link.path} text={link.text} href={link.path} />
          ))}
          <UseCaseBadge label={applicationType.id} />
        </div>
      )}
    </nav>
  );
}
