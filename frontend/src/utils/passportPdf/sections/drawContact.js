import { drawSectionTitle, drawRow, pick } from "../utils";

export const drawContact = (doc, data, y) => {
  const contact = data?.contact ?? {};

  y = drawSectionTitle(doc, "18. Contact Details", y + 1);

  y = drawRow(doc, y, [
    {
      label: "18A. Email *",
      value: pick(contact.email),
    },
    {
      label: "18B. Phone No. *",
      value: pick(contact.phoneNumber),
    },
  ]);

  return y;
};
