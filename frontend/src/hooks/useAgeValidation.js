export function useAgeValidation(minAge = 16) {
  const validateAge = (dateOfBirth) => {
    if (!dateOfBirth) {
      return "Date of birth is required";
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

    return age >= minAge || `Applicant must be at least ${minAge} years old`;
  };

  return { validateAge };
}
