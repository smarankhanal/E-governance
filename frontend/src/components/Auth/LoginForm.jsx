import React from "react";
import Input from "../Common/Input";
import Button from "../Common/Button/Button";
import { MdOutlineExitToApp } from "react-icons/md";

export default function LoginForm() {
  return (
    <form>
      <div>
        <div className="m-6 grid grid-cols-1 gap-4 px-4">
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email address"
            required
          />

          <Input label="Password" type="text" required />
        </div>
      </div>
      <div className="px-4 m-6">
        <Button logo={MdOutlineExitToApp}>Sign in</Button>
      </div>
      <p className="text-[#2f5f98] font-bold p-4 m-6">Recover Password</p>
    </form>
  );
}
