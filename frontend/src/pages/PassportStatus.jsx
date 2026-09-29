import React from "react";
import { PassportStatusForm } from "../components";
export default function PassportStatus() {
  return (
    <div className="w-full max-w-4xl mx-auto bg-surface rounded-2xl">
      <div className="flex flex-col justify-center items-center">
        <p className="text-text-primary uppercase p-2 text-3xl">
          Search applications for reprint
        </p>
      </div>

      <div>
        <PassportStatusForm />
      </div>
    </div>
  );
}
