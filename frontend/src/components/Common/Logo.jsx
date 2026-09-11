import React from "react";
import logo from "../../assets/images/Passport.png";

export default function Logo() {
  return (
    <div className="flex h-14 w-14 items-center justify-center">
      <img
        src={logo}
        alt="Passport Logo"
        className="h-13 w-13 object-contain"
      />
    </div>
  );
}
