import React from "react";

export default function CancelPopUp({ handleClosePopup, handleConfirmCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        {/* Header */}
        <h2 className="text-xl font-semibold text-[#495057]">
          Cancel appointment?
        </h2>

        {/* Message */}
        <p className="mt-3 text-sm leading-6 text-[#6f747a]">
          Are you sure you want to cancel this application? All the data entered
          during the appointment process will be cleared.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex justify-end gap-4">
          <button
            type="button"
            onClick={handleClosePopup}
            className="rounded-md border border-[#d9dee3] px-5 py-2.5 text-sm font-medium text-[#495057] transition hover:bg-[#f5f6f7]"
          >
            No, Keep it
          </button>

          <button
            type="button"
            onClick={handleConfirmCancel}
            className="rounded-md bg-[#2F5F98] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#254d7c]"
          >
            Yes, Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
