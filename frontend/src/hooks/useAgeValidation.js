export function useAgeValidation(dateOfBirth, minAge = 16) {
  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) {
      return null;
    }

    const dob = new Date(dateOfBirth);
    const today = new Date();

    let age = today.getFullYear() - dob.getFullYear();

    const monthDifference = today.getMonth() - dob.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < dob.getDate())
    ) {
      age--;
    }

    return age;
  };

  const age = calculateAge(dateOfBirth);

  const validateAge = () => {
    if (!dateOfBirth) {
      return "Date of birth is required";
    }

    return age >= minAge || `Applicant must be at least ${minAge} years old`;
  };

  return {
    age,
    validateAge,
  };
}
