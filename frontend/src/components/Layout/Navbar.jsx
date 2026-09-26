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

  useEffect(() => {
    if (!applicationId) {
      return;
    }

    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [applicationId]);

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
                  className="text-sm font-medium text-[#495057] transition hover:text-[#2F5F98]"
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
              <div className="hidden text-sm font-medium text-[#495057] lg:block">
                Application ID:{" "}
                <span className="font-bold text-[#2F5F98]">
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
              <FaUniversalAccess className="text-xl text-[#495057]" />

              <AnchorTag text="Sign in" to="/login" />
            </div>

            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className="text-2xl text-[#495057] md:hidden"
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
                className="text-left text-sm font-medium text-[#495057] transition hover:text-[#2F5F98]"
              >
                {link.text}
              </button>
            ))}

            {isApplicationPage && passportType && (
              <UseCaseBadge label={passportType.keyword?.toUpperCase()} />
            )}

            {applicationId && (
              <div className="text-sm font-medium text-[#495057]">
                Application ID:{" "}
                <span className="font-bold text-[#2F5F98]">
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
