import { drawSectionTitle, drawRow, formatDate, pick, sexCode } from "../utils";

export const drawPersonalInformation = (doc, data, y) => {
  const p = data?.personalDetails?.personal ?? {};
  const c = data?.personalDetails?.citizenshipDetail ?? {};
  const prev = data?.previousDocument ?? {};

  y = drawSectionTitle(doc, "Personal Information", y);

  y = drawRow(doc, y, [{ label: "1. Surname *", value: p.surname }]);
  y = drawRow(doc, y, [{ label: "2. Given Names *", value: p.givenName }]);

  y = drawRow(doc, y, [
    {
      label: "3. Place of Birth * (District/Country if Abroad)",
      value: p.placeOfBirth,
    },
    { label: "4. Nationality *", value: p.nationality },
  ]);

  y = drawRow(doc, y, [
    {
      label: "5A. Date of Birth A.D. * (YYYY/MM/DD)",
      value: formatDate(p.dateOfBirth_AD),
    },
    { label: "5B. Date of Birth B.S. * (YYYY/MM/DD)", value: p.dateOfBirth_BS },
    {
      label: "6. Sex *",
      value: sexCode(p.gender),
      hint: ["M for Male", "F for Female", "X for Others"],
    },
  ]);

  y = drawRow(doc, y, [
    {
      label: "7. Citizenship or Permit No. *",
      value: pick(c.citizenship, c.minorId),
    },
    { label: "8. Date of Issue A.D. *", value: formatDate(c.issueDate_AD) },
  ]);

  y = drawRow(doc, y, [
    { label: "9. Place of Issue *", value: c.issueDistrict },
    { label: "10. National Identity No.", value: p.nin },
  ]);

  y = drawRow(doc, y, [
    {
      label: "11. Latest Passport or Travel Document No.",
      value: prev.passportNumber,
    },
    { label: "11A. Date of Issue A.D.", value: formatDate(prev.dateOfIssue) },
  ]);

  y = drawRow(doc, y, [
    { label: "11B. Place of Issue", value: prev.placeOfIssue },
  ]);

  return y;
};
