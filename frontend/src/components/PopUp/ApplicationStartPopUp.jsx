import React from "react";

export default function ApplicationStartPopUp({ onClose, onStart }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <h2 className="text-xl font-semibold text-[#495057]">
          Application Time Limit
        </h2>

        <p className="mt-4 text-sm leading-6 text-[#6f747a]">
          You have <strong>15 minutes</strong> to complete and submit the
          application after proceeding.
        </p>

        <div className="mt-4 rounded-md bg-[#e5f0ff] px-4 py-3 text-sm text-[#2874e8]">
          Please make sure you have all the required information and documents
          ready before continuing.
        </div>

        <p className="mt-4 text-sm leading-6 text-[#6f747a]">
          The remaining time will be displayed in the navigation bar. If the
          time expires, your application session will be cleared.
        </p>

        <div className="mt-8 flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-[#d9dee3] px-5 py-2.5 text-sm font-medium text-[#495057] transition hover:bg-[#f5f6f7]"
          >
            Go Back
          </button>

          <button
            type="button"
            onClick={onStart}
            className="rounded-md bg-[#2F5F98] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#254d7c]"
          >
            Start Application
          </button>
        </div>
      </div>
    </div>
  );
}
