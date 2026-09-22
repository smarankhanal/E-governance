import { useFormContext, Controller } from "react-hook-form";
import Heading from "../../../Common/Heading";
import Select from "../../../Common/Select";
import Input from "../../../Common/Input";
import DatePicker from "../../../Picker/DatePicker";
import useADToBs from "../../../../hooks/useADToBs";
export default function PersonalDetails({ districts }) {
  const { convertADToBS } = useADToBs();
  const {
    control,
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  const genderOptions = ["Male", "Female", "Other"];

  return (
    <div className="w-full px-2 py-4 sm:px-4">
      <Heading text="PERSONAL DETAILS" />

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-4">
        <Input
          label="Given Name"
          placeholder="FIRST NAME MIDDLE NAME"
          required
          error={errors.personalDetails?.personal?.givenName?.message}
          {...register("personalDetails.personal.givenName", {
            required: "Given name is required",
          })}
        />

        <Input
          label="Surname"
          placeholder="SURNAME"
          required
          error={errors.personalDetails?.personal?.surname?.message}
          {...register("personalDetails.personal.surname", {
            required: "Surname is required",
          })}
        />
        <Controller
          name="personalDetails.personal.gender"
          control={control}
          rules={{
            required: "Gender is required",
          }}
          render={({ field, fieldState }) => (
            <Select
              label="Gender"
              placeholder="Select gender"
              options={genderOptions}
              required
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              name={field.name}
              error={fieldState.error?.message}
            />
          )}
        />

        <Controller
          name="personalDetails.personal.dateOfBirth_AD"
          control={control}
          rules={{
            required: "Date of birth is required",
          }}
          render={({ field, fieldState }) => (
            <DatePicker
              label="Date of Birth (AD)"
              required
              value={field.value}
              onChange={(adDate) => {
                field.onChange(adDate);
                const bsDate = convertADToBS(adDate);
                setValue("personalDetails.personal.dateOfBirth_BS", bsDate, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
              onBlur={field.onBlur}
              error={fieldState.error?.message}
            />
          )}
        />

        <Input
          label="Date of Birth (BS)"
          type="text"
          required
          readOnly
          error={errors.personalDetails?.personal?.dateOfBirth_BS?.message}
          {...register("personalDetails.personal.dateOfBirth_BS", {
            required: "Date of birth is required",
          })}
        />
        <Input
          label="NIN"
          placeholder="Enter NIN"
          required
          error={errors.personalDetails?.personal?.nin?.message}
          {...register("personalDetails.personal.nin", {
            required: "NIN is required",
            minLength: {
              value: 10,
              message: "NIN must be at least 10 digits",
            },
            pattern: {
              value: /^\d+$/,
              message: "NIN must contain only numbers",
            },
          })}
        />

        <Input
          type="text"
          label="Nationality"
          value="Nepali"
          required
          {...register("personalDetails.personal.nationality", {
            required: "Nationality is required",
          })}
        />

        <Input
          label="Country"
          value="Nepal"
          required
          readOnly
          error={errors.personalDetails?.personal?.country?.message}
          {...register("personalDetails.personal.country")}
        />

        <Controller
          name="personalDetails.personal.placeOfBirth"
          control={control}
          rules={{
            required: "Birth place is required",
          }}
          render={({ field }) => (
            <Select
              label="Place of Birth"
              required
              options={districts}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              name={field.name}
              error={errors.personalDetails?.personal?.placeOfBirth?.message}
            />
          )}
        />
      </div>
    </div>
  );
}
