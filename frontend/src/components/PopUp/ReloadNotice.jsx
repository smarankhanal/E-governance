import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  SESSION_KEY,
  useApplicationSession,
} from "../../Context/ApplicationSessionContext";

const shouldShow = () => {
  const [nav] = performance.getEntriesByType("navigation");
  if (nav?.type !== "reload") return false;

  try {
    const session = JSON.parse(sessionStorage.getItem(SESSION_KEY));
    if (session && session.applicationId) {
      return true;
    }
  } catch {
    return false;
  }
};

export default function ReloadNotice({
  redirectTo = "/application/pre-enrollment-home",
}) {
  const navigate = useNavigate();
  const { clearApplicationSession } = useApplicationSession();
  const [open, setOpen] = useState(shouldShow);

  if (!open) return null;

  const handleOk = () => {
    clearApplicationSession(); // removes the stored session
    setOpen(false);
    navigate(redirectTo, { replace: true });
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="reload-title"
        className="w-full max-w-xl rounded-lg bg-white p-8 shadow-xl"
      >
        <h2
          id="reload-title"
          className="mb-8 text-xl font-semibold text-slate-700"
        >
          Confirmation
        </h2>
        <p className="mb-8 text-slate-600">
          Page was reloaded. Entered data will be lost. You will be redirected
          to the home page.
        </p>
        <button
          type="button"
          onClick={handleOk}
          className="w-full rounded-md bg-[#2f5f98] py-3 font-semibold text-white"
        >
          OK
        </button>
      </div>
    </div>
  );
}
