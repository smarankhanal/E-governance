import React from "react";
import RegisterLink from "./RegisterLink";
import SignInLink from "./SignInLink";
import ApplyWithoutAccount from "./ApplyWithoutAccount";
import ApplicationStatusLink from "./ApplicationStatusLink";

export default function NavLink() {
  return (
    <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-5 px-4 py-6 sm:grid-cols-2 lg:grid-cols-4">
      <RegisterLink />
      <SignInLink />
      <ApplyWithoutAccount />
      <ApplicationStatusLink />
    </div>
  );
}
