import { drawRow, fullName } from "../utils";

export const drawParentInformation = (doc, data, y) => {
  const p = data?.personalDetails?.parental ?? {};

  return drawRow(doc, y, [
    {
      label: "15. Father's Full Name *",
      value: fullName(p.fatherName, p.fatherSurname),
    },
    {
      label: "16. Mother's Full Name *",
      value: fullName(p.motherName, p.motherSurname),
    },
  ]);
};
