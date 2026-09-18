import React from "react";
import { AppointmentForm, StepIndicator } from "../components";

export default function PassportForm() {
  return (
    <div className="w-full max-w-4xl mx-auto shadow-lg">
      <StepIndicator />
      <AppointmentForm />
    </div>
  );
}
