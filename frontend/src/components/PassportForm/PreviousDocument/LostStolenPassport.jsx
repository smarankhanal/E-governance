import React, { useEffect, useState } from "react";
import Heading from "../../Common/Heading";
import Input from "../../Common/Input";
import Select from "../../Common/Select";
import { Controller, useFormContext } from "react-hook-form";
import DatePicker from "../../Picker/DatePicker";
import { getAllDistricts } from "../../../services/addressApi";

export default function LostStolenPassport() {
  const {
    control,
    register,
    trigger,
    formState: { errors },
  } = useFormContext();

  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    const fetchAllDistricts = async () => {
      try {
        const data = await getAllDistricts();
        setDistricts(data);
      } catch (error) {
        console.error("Failed to fetch districts:", error);
      }
    };

    fetchAllDistricts();
  }, []);

  return (
    <div className="w-full px-4 py-6 sm:px-8">
      <Heading text="Last/Current Passport Information" />

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <Input
          label="Country of Theft/Lost"
          labelclassName="text-base"
          value="Nepal"
          disabled
          required
          {...register("lostStolenPassport.countryOfTheft")}
        />

        <Controller
          name="lostStolenPassport.dateOfIssue"
          control={control}
          rules={{
            required: "Date of issue is required",
          }}
          render={({ field }) => (
            <DatePicker
              label="Date of Issue A.D. (for Existing Passport)"
              labelclassName="text-base"
              value={field.value}
              onChange={(date) => {
                field.onChange(date);
                trigger("lostStolenPassport.dateOfIssue");
              }}
              onBlur={field.onBlur}
              error={errors.lostStolenPassport?.dateOfIssue?.message}
            />
          )}
        />

        <Controller
          name="lostStolenPassport.placeOfIssueDistrict"
          control={control}
          rules={{
            required: "Place of issue is required",
          }}
          render={({ field }) => (
            <Select
              label="Place of Issue (District) - For Existing Passport"
              labelclassName="text-base"
              required
              options={districts}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              name={field.name}
              error={errors.lostStolenPassport?.placeOfIssueDistrict?.message}
            />
          )}
        />

        <Controller
          name="lostStolenPassport.dateOfTheft"
          control={control}
          rules={{
            required: "Date of theft/lost is required",
          }}
          render={({ field }) => (
            <DatePicker
              label="Date of Theft/Lost"
              labelclassName="text-base"
              value={field.value}
              onChange={(date) => {
                field.onChange(date);
                trigger("lostStolenPassport.dateOfTheft");
              }}
              onBlur={field.onBlur}
              error={errors.lostStolenPassport?.dateOfTheft?.message}
            />
          )}
        />

        <Input
          label="Latest Passport or Travel Document Number or Latest Seaman's Record Book"
          labelclassName="text-base"
          placeholder="Enter passport/travel document number"
          required
          {...register("lostStolenPassport.latestDocumentNumber", {
            required: "Latest passport/travel document number is required",
          })}
          error={errors.lostStolenPassport?.latestDocumentNumber?.message}
        />
      </div>
    </div>
  );
}
