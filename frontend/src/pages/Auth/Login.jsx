import React from "react";
import { LoginForm } from "../../components";
import PassportImg from "../../assets/images/Passport.png";
export default function Login() {
  return (
    <div className="w-full max-w-4xl mx-auto bg-[#F1F1F1] rounded-2xl">
      <div className="flex flex-col justify-center items-center">
        <div className="mx-auto  flex h-50 w-50 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
          <img
            src={PassportImg}
            alt="Passport"
            className="h-full w-full object-contain"
          />
        </div>

        <p className="text-2xl p-2">Sign in</p>
        <p className="text-gray-500 p-2">
          Sign in with your username and password
        </p>
        <p className="text-[#2f5f98] font-bold p-2">Register a new account</p>
      </div>

      <div>
        <LoginForm />
      </div>
    </div>
  );
}
