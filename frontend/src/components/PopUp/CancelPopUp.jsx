import React from "react";

export default function CancelPopUp({ handleClosePopup, handleConfirmCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        {/* Header */}
        <h2 className="text-xl font-semibold text-text-primary">
          Cancel appointment?
        </h2>

        {/* Message */}
        <p className="mt-3 text-sm leading-6 text-text-muted">
          Are you sure you want to cancel this application? All the data entered
          during the appointment process will be cleared.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex justify-end gap-4">
          <button
            type="button"
            onClick={handleClosePopup}
            className="rounded-md border border-border-card px-5 py-2.5 text-sm font-medium text-text-primary transition hover:bg-surface-muted"
          >
            No, Keep it
          </button>

          <button
            type="button"
            onClick={handleConfirmCancel}
            className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-text-on-primary transition hover:bg-primary-hover"
          >
            Yes, Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
