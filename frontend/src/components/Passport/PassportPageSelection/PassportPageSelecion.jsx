import React from "react";
import NextButton from "../../Common/Button/NextButton";

const RadioOption = ({ label, selected, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="flex items-center gap-3 group"
  >
    <span
      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
        selected
          ? "border-blue-600"
          : "border-slate-300 group-hover:border-slate-400"
      }`}
    >
      {selected && <span className="w-3 h-3 rounded-full bg-blue-600" />}
    </span>

    <span className="text-[#495057] text-[22px]">{label}</span>
  </button>
);

export default function PassportPageSelection({
  selectedDocument,
  onDocumentSelect,
  onNext,
}) {
  return (
    <div className="min-h-screen w-full bg-white px-6 py-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-slate-800 text-xl font-bold tracking-wide">
          DOCUMENT SELECTION
        </h1>

        <div className="h-0.75 bg-[#2f5f98] mt-2 mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="flex items-center gap-3 bg-blue-50 rounded-lg px-5 py-4 mb-8">
              <span className="text-blue-600">
                Please select the document you want to apply for.
              </span>
            </div>

            <div className="mb-8 flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-10">
              <RadioOption
                label="Ordinary 34 pages"
                selected={selectedDocument === "34"}
                onClick={() => onDocumentSelect("34")}
              />

              <RadioOption
                label="Ordinary 66 pages"
                selected={selectedDocument === "66"}
                onClick={() => onDocumentSelect("66")}
              />
            </div>
          </div>

          <div>
            <h2 className="text-slate-800 text-lg font-bold text-center">
              READ BEFORE PRE-ENROLLMENT
            </h2>

            <ol className="space-y-6 pl-6 text-[18px] text-[#495057] leading-relaxed">
              <li>
                1.The pre-enrollment form alone is insufficient for passport
                issuance. Applicant must be present in-person at the enrollment
                center to do biometrics and submit the application.
              </li>

              <li>
                2.You must present necessary documents (original) during
                enrollment. You need to pay passport fee (Revenue) before
                biometrics.
              </li>

              <li>
                3.Please download the application form and keep it safe. You
                need to bring with you a printed copy during enrolment.
              </li>

              <li>
                4.Please scan the necessary document in jpg, png with size less
                than 300 kb in clear to upload.
              </li>
            </ol>
          </div>
        </div>

        <div className="float-right mt-2">
          <NextButton disabled={!selectedDocument} onClick={onNext} />
        </div>
      </div>
    </div>
  );
}
