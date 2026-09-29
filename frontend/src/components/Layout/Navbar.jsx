import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import Logo from "../Common/Logo";
import AnchorTag from "../Common/AnchorTag";
import { FaBars, FaTimes, FaUniversalAccess } from "react-icons/fa";

import UseCaseBadge from "../Common/UseCaseBadge";
import CancelPopUp from "../PopUp/CancelPopUp";

import { useApplicationSession } from "../../Context/ApplicationSessionContext";
import { clearPassportType } from "../../store/slice/passportSlice";
import ApplicationTimer from "../Common/ApplicationTimer";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showHomePopup, setShowHomePopup] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const passportType = useSelector((state) => state.passport.passportType);

  const { applicationId, expiresAt, clearApplicationSession } =
    useApplicationSession();

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

  const isApplicationPage = location.pathname.startsWith("/application");

  const handleNavigation = (path) => {
    if (path === "/" && applicationId && isApplicationPage) {
      setShowHomePopup(true);
      setIsOpen(false);
      return;
    }

    setIsOpen(false);
    navigate(path);
  };

  const handleConfirmHome = () => {
    clearApplicationSession();

    dispatch(clearPassportType());

    setShowHomePopup(false);
    setIsOpen(false);

    navigate("/", {
      replace: true,
    });
  };

  const handleCloseHomePopup = () => {
    setShowHomePopup(false);
  };

  const handleTimerExpire = () => {
    alert(
      "Your application session has expired. All entered data will be cleared.",
    );

    clearApplicationSession();

    dispatch(clearPassportType());

    navigate("/application/pre-enrollment-home", {
      replace: true,
    });
  };

  return (
    <>
      <nav className="w-full border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between px-5 py-3 md:px-10">
          <div className="flex items-center gap-4">
            <Logo />

            <div className="hidden items-center gap-8 md:flex">
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  type="button"
                  onClick={() => handleNavigation(link.path)}
                  className="text-sm font-medium text-text-primary transition hover:text-text-on-primary"
                >
                  {link.text}
                </button>
              ))}

              {isApplicationPage && passportType && (
                <UseCaseBadge label={passportType.keyword?.toUpperCase()} />
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {applicationId && (
              <div className="hidden text-sm font-medium text-text-primary lg:block">
                Application ID:{" "}
                <span className="font-bold text-text-on-primary">
                  {applicationId}
                </span>
              </div>
            )}

            {expiresAt && (
              <ApplicationTimer
                expiresAt={expiresAt}
                onExpire={handleTimerExpire}
              />
            )}

            <div className="flex items-center gap-2">
              <FaUniversalAccess className="text-xl text-text-primary" />

              <AnchorTag text="Sign in" to="/login" />
            </div>

            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className="text-2xl text-text-primary md:hidden"
              aria-label="Toggle menu"
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="flex flex-col gap-4 border-t border-gray-200 px-5 py-4 md:hidden">
            {navLinks.map((link) => (
              <button
                key={link.path}
                type="button"
                onClick={() => handleNavigation(link.path)}
                className="text-left text-sm font-medium text-text-primary transition hover:text-text-on-primary"
              >
                {link.text}
              </button>
            ))}

            {isApplicationPage && passportType && (
              <UseCaseBadge label={passportType.keyword?.toUpperCase()} />
            )}

            {applicationId && (
              <div className="text-sm font-medium text-text-primary">
                Application ID:{" "}
                <span className="font-bold text-text-on-primary">
                  {applicationId}
                </span>
              </div>
            )}

            {expiresAt && (
              <ApplicationTimer
                expiresAt={expiresAt}
                onExpire={handleTimerExpire}
              />
            )}
          </div>
        )}
      </nav>

      {showHomePopup && (
        <CancelPopUp
          handleClosePopup={handleCloseHomePopup}
          handleConfirmCancel={handleConfirmHome}
        />
      )}
    </>
  );
}
