import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useSelector } from "react-redux";

import { PassportTypeSelector, DataPrivacyConsentModal } from "../components";

import PassportPageSelection from "../components/Passport/PassportPageSelection/PassportPageSelecion";

export default function PassportType() {
  const [expand, setExpand] = useState(true);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const selected = useSelector((state) => state.passport.passportType);
  const selectedDocument = useSelector(
    (state) => state.passport.selectedDocument,
  );

  useEffect(() => {
    if (selected) {
      setExpand(false);
    }
  }, [selected]);

  const handleNext = () => {
    if (!selectedDocument) return;
    setShowPrivacyModal(true);
  };

  const handleAgree = () => {
    setShowPrivacyModal(false);
  };

  const handleRefuse = () => {
    setShowPrivacyModal(false);
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-5 py-8 shadow-md">
      <div className="text-center">
        <p className="font-serif text-[30px] font-medium uppercase text-[#495057] sm:text-[46px]">
          Type of Passport
        </p>

        <p className="mt-6 mb-3 font-serif font-normal text-[#92969a]">
          Please select your Passport type.
        </p>
      </div>

      <div>
        <div
          className="flex cursor-pointer items-center rounded-lg border border-gray-100 bg-white px-4 py-3 shadow-sm transition-colors hover:bg-gray-50"
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
                ? `Current Passport type - ${selected.en1} ${
                    selected.en2
                  }${selected.en3 ? ` ${selected.en3}` : ""}`
                : "Please select your Passport type"}
            </span>
          </p>
        </div>

        {expand && <PassportTypeSelector selected={selected} />}

        {selected && <PassportPageSelection onNext={handleNext} />}
      </div>

      <DataPrivacyConsentModal
        open={showPrivacyModal}
        onAgree={handleAgree}
        onRefuse={handleRefuse}
        onClose={() => setShowPrivacyModal(false)}
      />
    </div>
  );
}
