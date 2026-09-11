import React from "react";
import { ApplicationStatusForm } from "../components";
export default function ApplicationStatus() {
  return (
    <div className="w-full max-w-4xl mx-auto bg-[#F1F1F1] rounded-2xl">
      <div className="flex flex-col justify-center items-center">
        <p className="text-[#495057] uppercase p-2 text-3xl">
          Search applications for reprint
        </p>
      </div>

      <div>
        <ApplicationStatusForm />
      </div>
    </div>
  );
}
