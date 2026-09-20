import React, { useState } from "react";
import BackButton from "../../Common/Button/BackButton";
import CancelButton from "../../Common/Button/CancelButton";
import NextButton from "../../Common/Button/NextButton";
import { useNavigate } from "react-router-dom";
export default function DocumentForm({ onFormBack, onFormNext }) {
  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const navigate = useNavigate();

  const handleCancel = () => {
    setShowCancelPopup(true);
  };

  const handleClosePopup = () => {
    setShowCancelPopup(false);
  };

  const handleConfirmCancel = () => {
    setShowCancelPopup(false);
    navigate("/application/pre-enrollment-home");
  };
  return (
    <div>
      <div className="mt-16 flex items-center justify-between sm:mt-32">
        <div className="flex gap-6">
          <BackButton onClick={onFormBack} />
          <CancelButton onClick={handleCancel} />
        </div>

        <NextButton onClick={onFormNext} />
      </div>
      {showCancelPopup && (
        <CancelPopUp
          handleClosePopup={handleClosePopup}
          handleConfirmCancel={handleConfirmCancel}
        />
      )}
    </div>
  );
}
