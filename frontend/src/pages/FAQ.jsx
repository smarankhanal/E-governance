import React, { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const faqs = [
  {
    question: "Who can apply for a passport?",
    answer:
      "Any eligible Nepali citizen can apply for a passport through the online pre-enrollment system. The applicant must complete the required information and appear in person at the selected enrollment center for biometric enrollment.",
  },
  {
    question: "What documents do I need to apply for a passport?",
    answer:
      "You need to provide the required original documents during enrollment. The exact documents may vary depending on your application type, such as first issuance, renewal, replacement, or data correction.",
  },
  {
    question: "Can I apply for a passport completely online?",
    answer:
      "No. The online application is used for pre-enrollment and appointment-related processes. You must be physically present at the enrollment center for document verification, biometrics, and submission of the application.",
  },
  {
    question: "How do I choose my application type?",
    answer:
      "Select the application type that matches your situation. The available options include First Issuance, Passport Renewal, Replacement for Lost or Stolen Passport, Replacement for Damaged Passport, and Modification for Data Correction.",
  },
  {
    question: "What is the difference between ordinary 34 pages and 66 pages?",
    answer:
      "The difference is the number of visa and travel pages available in the passport. Choose the page option according to your expected travel requirements.",
  },
  {
    question: "What should I do if my passport is lost or stolen?",
    answer:
      "Select the passport replacement option for lost or stolen passports and provide the required information and supporting documents during the enrollment process.",
  },
  {
    question: "Can I correct incorrect information on my passport?",
    answer:
      "Yes. If you need to correct eligible personal information, select the Modification (Data Correction) application type and provide the required supporting documents.",
  },
  {
    question: "Do I need to bring the printed application form?",
    answer:
      "Yes. After completing the online pre-enrollment process, download and print the application form. Keep the printed copy safely and bring it with you to the enrollment center.",
  },
  {
    question: "What type of documents can I upload?",
    answer:
      "Documents should be clear and readable. Supported image formats include JPG and PNG, and uploaded files should meet the required file-size limit specified by the application.",
  },
  {
    question: "Do I need to pay the passport fee before biometrics?",
    answer:
      "Yes. The required passport fee or revenue should be paid according to the applicable process before biometric enrollment.",
  },
  {
    question: "Can I change my application after submitting it?",
    answer:
      "Some information may not be editable after submission. Review all the information carefully before proceeding and contact the appropriate enrollment authority if you need to make a correction.",
  },
  {
    question: "What should I do if I have another problem with my application?",
    answer:
      "If your issue is not covered in this FAQ, contact the relevant passport or enrollment authority for assistance and provide your application details when requested.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="mx-auto w-full max-w-5xl px-5 py-12 sm:px-8">
      {/* Header */}
      <div className="mb-10 text-center">
        <p className="font-serif text-[32px] font-medium uppercase text-[#495057] sm:text-[46px]">
          Frequently Asked Questions
        </p>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#92969a] sm:text-base">
          Find answers to common questions about passport applications,
          documents, enrollment, and the application process.
        </p>
      </div>

      {/* FAQ List */}
      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              className={`overflow-hidden rounded-xl border transition-all duration-300 ${
                isOpen
                  ? "border-[#2f5f98] shadow-sm"
                  : "border-slate-200 bg-white"
              }`}
            >
              {/* Question */}
              <button
                type="button"
                onClick={() => toggleFAQ(index)}
                className={`flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors duration-200 sm:px-6 ${
                  isOpen ? "bg-[#f1f6fb]" : "bg-white hover:bg-slate-50"
                }`}
              >
                <span className="text-sm font-semibold text-[#495057] sm:text-base">
                  {faq.question}
                </span>

                <MdOutlineKeyboardArrowDown
                  className={`shrink-0 text-2xl text-[#2f5f98] transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Answer */}
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="border-t border-slate-100 px-5 py-5 text-sm leading-7 text-slate-600 sm:px-6">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
