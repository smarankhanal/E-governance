import Input from "../Common/Input";
import Button from "../Common/Button/Button";
import { FiUser } from "react-icons/fi";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "../Picker/DatePicker";
import { useAgeValidation } from "../../hooks/useAgeValidation";

export default function SignupForm() {
  const { validateAge } = useAgeValidation(16);
  const {
    control,
    register,
    trigger,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });
  return (
    <form>
      {/* Given Name + Surname */}
      <div className="m-6 grid grid-cols-1 gap-4 px-4 sm:grid-cols-2">
        <Input
          label="Given Name"
          type="text"
          placeholder="FIRST NAME MIDDLE NAME"
          required
          {...register("givenName", {
            required: "Given name is required",
          })}
          error={errors.givenName?.message}
        />

        <Input
          label="Surname"
          type="text"
          placeholder="Surname"
          required
          {...register("surname", {
            required: "Surname is required",
          })}
          error={errors.surname?.message}
        />
      </div>

      {/* Date of Birth + NIN */}
      <div className="m-6 grid grid-cols-1 gap-4 px-4 sm:grid-cols-2">
        <Controller
          name="dateOfBirth"
          control={control}
          rules={{
            required: "Date of birth is required",
            validate: (value) => validateAge(value),
          }}
          render={({ field }) => (
            <DatePicker
              label="Date of Birth(AD)"
              value={field.value}
              onChange={(date) => {
                field.onChange(date);
                trigger("dateOfBirth");
              }}
              onBlur={field.onBlur}
              error={errors.dateOfBirth?.message}
            />
          )}
        />

        <Input
          label="National Identity Number (NIN)"
          type="text"
          required
          {...register("nin", {
            required: "National Identity Number is required",
          })}
          error={errors.nin?.message}
        />
      </div>

      {/* Password + Confirm Password */}
      <div className="m-6 grid grid-cols-1 gap-4 px-4 sm:grid-cols-2">
        <Input
          label="Password"
          type="password"
          required
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
          error={errors.password?.message}
        />

        <Input
          label="Confirm password"
          type="password"
          required
          {...register("confirmPassword", {
            required: "Please confirm your password",
          })}
          error={errors.confirmPassword?.message}
        />
      </div>

      {/* Email + Phone */}
      <div className="m-6 grid grid-cols-1 gap-4 px-4 sm:grid-cols-2">
        <Input
          label="Email"
          type="email"
          required
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please enter a valid email",
            },
          })}
          error={errors.email?.message}
        />

        <Input
          label="Phone Number"
          type="tel"
          placeholder="98XXXXXXXX"
          required
          {...register("phoneNumber", {
            required: "Phone number is required",
          })}
          error={errors.phoneNumber?.message}
        />
      </div>

      {/* Register Button */}
      <div className="m-6 px-4">
        <Button logo={FiUser}>Register</Button>
      </div>
    </form>
  );
}
