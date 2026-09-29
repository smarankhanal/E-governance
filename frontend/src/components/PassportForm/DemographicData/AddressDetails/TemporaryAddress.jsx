import React from "react";
import { useFormContext } from "react-hook-form";
import Heading from "../../../Common/Heading";
import InfoAlert from "../../../Common/InfoAlert";
import AddressSelector from "../../../Address/AddressSelector";
import Input from "../../../Common/Input";
export default function TemporaryAddress() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="w-full px-2 py-4 sm:px-4">
      <Heading text="TEMPORARY ADDRESS" className="my-5" />
      <AddressSelector
        prefix="temporaryAddress"
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
          className="hover:border-accent"
          error={errors.temporaryAddress?.ward?.message}
          {...register("temporaryAddress.ward", {
            required: "Ward is required",
          })}
        />

        <Input
          label="Street"
          required
          className="hover:border-accent"
          error={errors.temporaryAddress?.street?.message}
          {...register("temporaryAddress.street", {
            required: "Street is required",
          })}
        />

        <Input
          label="House Number"
          className="hover:border-accent"
          {...register("temporaryAddress.houseNumber")}
        />
      </div>
    </div>
  );
}
