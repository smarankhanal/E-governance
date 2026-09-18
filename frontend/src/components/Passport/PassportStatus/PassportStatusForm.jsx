import React from "react";
import { FiSearch } from "react-icons/fi";
import Input from "../../Common/Input";
import Button from "../../Common/Button/Button";

export default function PassportStatusForm() {
  return (
    <form>
      <div>
        <div className="m-6 grid grid-cols-1 gap-4 px-4">
          <Input label="Application ID" type="text" required />
          <Input
            label="Date of birth AD"
            placeholder="YYYY-MM-DD"
            type="date"
            required
          />
        </div>
      </div>
      <div className="px-4 m-6">
        <Button logo={FiSearch}>Search</Button>
      </div>
    </form>
  );
}
