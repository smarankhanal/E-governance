import React from "react";
import { useApplicationSession } from "../Context/ApplicationSessionContext";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { generatePassportPDF } from "../utils/passportPdf";
// import QRCode from "react-qr-code";

export default function RequestSuccess() {
  const { applicationId } = useApplicationSession();
  const { passportType } = useSelector((state) => state.passport);
  const location = useLocation();
  const formData = location.state?.formData;
  const appointmentDetails = formData?.appointment;
  const handleDownloadPDF = async () => {
    try {
      const response = await generatePassportPDF({
        ...formData,
        applicationId,
        passportType,
        appointment: appointmentDetails,
      });
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-3 py-6 sm:px-6">
      <div className="mx-auto w-full max-w-4xl bg-white shadow-sm">
        {/* Top Border */}
        <div className="h-1.5 bg-[#2F5F98]" />

        <div className="px-5 py-5 sm:px-8">
          {/* Header */}
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1">
              <p className=" text-gray-500">Request Number</p>

              <p className="mt-1  font-medium text-[#495057]">
                {applicationId}
              </p>

              <div className="mt-5">
                <p className=" text-gray-500">E-Service</p>

                <h1 className="mt-1 font-medium text-[#495057]">
                  {passportType?.en1 && `${passportType?.en1} `}
                  {passportType?.en2 && `${passportType?.en2} `}
                  {passportType?.en3 && passportType?.en3}
                </h1>
              </div>
            </div>

            {/* QR Code */}
            {/* <div className="flex shrink-0 items-center justify-center">
              <QRCode
                value={applicationId}
                size={90}
                bgColor="#ffffff"
                fgColor="#000000"
              />
            </div> */}
          </div>

          {/* Request History */}
          <div className="mt-5 border-b border-gray-200 pb-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className=" text-gray-500">Request History</p>

                <p className="mt-1 text-[#495057]">
                  {new Date().toLocaleString("en-US")}
                </p>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <p className=" font-medium text-[#495057]">
                Request has been successfully submitted
              </p>
            </div>
          </div>

          {/* Appointment Details */}
          <div className="mt-5">
            <p className="mb-2  text-gray-500">Appointment Details</p>

            <div className="rounded-sm border border-gray-200 bg-white px-4 py-4 shadow-sm">
              {/* Date */}
              <div>
                <p className=" text-gray-500">Date</p>

                <p className="mt-0.5  font-medium text-[#495057]">
                  {appointmentDetails?.appointmentDate
                    ? appointmentDetails?.appointmentDate.toLocaleDateString(
                        "en-CA",
                      )
                    : ""}
                </p>
              </div>

              {/* Time */}
              <div className="mt-3">
                <p className=" text-gray-500">Time</p>

                <p className="mt-0.5  font-medium text-[#495057]">
                  {appointmentDetails?.appointmentTime}
                </p>
              </div>

              {/* Location */}
              <div className="mt-3">
                <p className=" text-gray-500">Location</p>

                <p className="mt-0.5  font-medium text-[#495057]">
                  {appointmentDetails?.locationName}
                </p>
              </div>
            </div>
          </div>

          {/* Instruction */}
          <div className="my-5 border-y border-gray-200 py-4 text-center">
            <p className="text-xs font-medium text-[#a85b5b]">
              Please print the form or take a screen shot of the downloaded form
              with barcode before going to the enrollment center
            </p>
          </div>

          {/* Bottom Actions */}
          <div className="flex items-center justify-end px-2 sm:px-10">
            <button
              type="button"
              onClick={handleDownloadPDF}
              className="min-w-33.75 bg-[#2F5F98] px-6 py-2 font-medium text-white transition hover:bg-[#294e78] focus:outline-none"
            >
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
