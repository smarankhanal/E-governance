import React from "react";
import passport from "../../assets/images/PassportOffice.webp";

export default function HeroImage() {
  return (
    <section className="relative h-125 w-full overflow-hidden">
      {/* Background Image */}
      <img
        src={passport}
        alt="Passport Office"
        className="h-full w-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Hero Content */}
      <div className="absolute inset-0 z-10 flex items-center justify-center px-4 text-center">
        <div className="max-w-3xl text-white">
          <h1 className="text-3xl font-bold md:text-5xl">
            Passport Application & Appointment System
          </h1>

          <p className="mt-4 text-base text-white/90 md:text-lg">
            Apply for your passport and manage your appointment conveniently
            through our online service.
          </p>
        </div>
      </div>
    </section>
  );
}
