import React from "react";
import { useFormContext } from "react-hook-form";

import Heading from "../../Common/Heading";
import InfoAlert from "../../Common/InfoAlert";
import AddressSelector from "../../Address/AddressSelector";
import BackButton from "../../Common/Button/BackButton";
import CancelButton from "../../Common/Button/CancelButton";
import NextButton from "../../Common/Button/NextButton";

export default function ServiceTask({ onBack, onNext, onCancel }) {
  const { watch } = useFormContext();

  const province = watch("appointment.province");
  const district = watch("appointment.district");
  const location = watch("appointment.location");

  const isNextDisabled = !province || !district || !location;

  return (
    <div className="w-full px-2 py-4 sm:px-4">
      <Heading text="LOCATION" />

      <InfoAlert text="Please select one of the available locations." />

      <div className="mt-8">
        <AddressSelector
          prefix="appointment"
          showCountry={true}
          showProvince={true}
          showDistrict={true}
          showMunicipality={false}
          showLocation={true}
          provinceLabel="Appointment province"
          districtLabel="Appointment district"
          locationLabel="Appointment location"
        />
      </div>

      <div className="mt-16 flex items-center justify-between sm:mt-32">
        <div className="flex gap-6">
          <BackButton onClick={onBack} />
          <CancelButton onClick={onCancel} />
        </div>

        <NextButton onClick={onNext} disabled={isNextDisabled} />
      </div>
    </div>
  );
}
