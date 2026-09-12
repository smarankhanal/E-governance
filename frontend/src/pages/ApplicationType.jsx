import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { ApplicationTypeSelector } from "../components";
import { useSelector } from "react-redux";
import ApplicationSelection from "../components/Application/ApplicationSelection/ApplicationSelecion";

export default function ApplicationType() {
  const [expand, setExpand] = useState(true);

  const selected = useSelector((state) => state.application.applicationType);

  useEffect(() => {
    if (selected) {
      setExpand(false);
    }
  }, [selected]);

  return (
    <div className="mx-auto w-full max-w-7xl px-5 py-8 shadow-md">
      <div className="text-center">
        <p className="font-serif text-[30px] font-medium uppercase text-[#495057] sm:text-[46px]">
          Type of application
        </p>

        <p className="mt-6 mb-3 font-serif font-normal text-[#92969a]">
          Please select your application type.
        </p>
      </div>

      <div>
        <div
          className="flex cursor-pointer items-center rounded-lg border border-gray-100 bg-white px-4 py-3 shadow-sm hover:bg-gray-100"
          onClick={() => setExpand((prev) => !prev)}
        >
          <p className="flex items-center gap-2 text-lg font-medium text-[#495057]">
            {expand ? (
              <MdOutlineKeyboardArrowDown className="text-xl" />
            ) : (
              <MdOutlineKeyboardArrowRight className="text-xl" />
            )}

            <span className="font-bold">
              {selected
                ? `Current application type - ${selected.en1} ${selected.en2}${
                    selected.en3 ? ` ${selected.en3}` : ""
                  }`
                : "Please select your application type"}
            </span>
          </p>
        </div>

        {expand && <ApplicationTypeSelector selected={selected} />}
        {selected && <ApplicationSelection />}
      </div>
    </div>
  );
}
