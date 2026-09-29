import React from "react";

export default function ApplicationStartPopUp({ onClose, onStart }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <h2 className="text-xl font-semibold text-text-primary">
          Application Time Limit
        </h2>

        <p className="mt-4 text-sm leading-6 text-text-muted">
          You have <strong>15 minutes</strong> to complete and submit the
          application after proceeding.
        </p>

        <div className="mt-4 rounded-md bg-info-bg px-4 py-3 text-sm text-info-text">
          Please make sure you have all the required information and documents
          ready before continuing.
        </div>

        <p className="mt-4 text-sm leading-6 text-text-muted">
          The remaining time will be displayed in the navigation bar. If the
          time expires, your application session will be cleared.
        </p>

        <div className="mt-8 flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-border-card px-5 py-2.5 text-sm font-medium text-text-primary transition hover:bg-surface-muted"
          >
            Go Back
          </button>

          <button
            type="button"
            onClick={onStart}
            className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-text-on-primary transition hover:bg-primary-hover"
          >
            Start Application
          </button>
        </div>
      </div>
    </div>
  );
}
