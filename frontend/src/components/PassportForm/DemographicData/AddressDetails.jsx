import React from "react";
import { useFormContext } from "react-hook-form";

import Heading from "../../Common/Heading";
import InfoAlert from "../../Common/InfoAlert";
import BackButton from "../../Common/Button/BackButton";
import CancelButton from "../../Common/Button/CancelButton";
import NextButton from "../../Common/Button/NextButton";
import AddressSelector from "../../Address/AddressSelector";
import Input from "../../Common/Input";

export default function AddressDetails({ onBack, onCancel, onNext }) {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const province = watch("residentialAddress.province", "");
  const district = watch("residentialAddress.district", "");
  const municipality = watch("residentialAddress.municipality", "");
  const ward = watch("residentialAddress.ward", "");
  const street = watch("residentialAddress.street", "");

  const isNextDisabled =
    !province || !district || !municipality || !ward.trim() || !street.trim();

  return (
    <div className="w-full px-2 py-4 sm:px-4">
      <InfoAlert text="Please enter your address data" />

      <Heading text="RESIDENTIAL ADDRESS" className="my-5" />

      <AddressSelector
        prefix="residentialAddress"
        showCountry={false}
        showProvince={true}
        showDistrict={true}
        showMunicipality={true}
        showLocation={false}
      />

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
        <Input
          label="Ward"
          required
          className="hover:border-[#009DAC]"
          error={errors.residentialAddress?.ward?.message}
          {...register("residentialAddress.ward", {
            required: "Ward is required",
          })}
        />

        <Input
          label="Street"
          required
          className="hover:border-[#009DAC]"
          error={errors.residentialAddress?.street?.message}
          {...register("residentialAddress.street", {
            required: "Street is required",
          })}
        />

        <Input
          label="House Number"
          className="hover:border-[#009DAC]"
          {...register("residentialAddress.houseNumber")}
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
