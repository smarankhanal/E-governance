import React from "react";
import passportLogo from "../../assets/passport.svg";
export default function Logo() {
  return (
    <>
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white">
        <img
          src={passportLogo}
          alt="Passport"
          className="h-8 w-8 object-contain"
        />
      </div>
    </>
  );
}
