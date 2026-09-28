import { drawSectionTitle, drawRow, pick } from "../utils";

// Covers form items 12A-12F (permanent address) and 13-14 (email / phone)
export const drawAddress = (doc, data, y) => {
  const a = data?.residentialAddress ?? {};
  const contact = data?.contact ?? {};

  y = drawSectionTitle(doc, "12. Address", y + 2);

  y = drawRow(doc, y, [
    { label: "12A. Province *", value: pick(a.provinceName, a.province) },
    { label: "12B. District *", value: pick(a.districtName, a.district) },
  ]);

  y = drawRow(doc, y, [
    {
      label: "12C. Rural Municipality/Municipality *",
      value: pick(a.municipalityName, a.municipality),
      flex: 4,
    },
    { label: "12D. Ward No. *", value: a.ward, flex: 1 },
  ]);

  y = drawRow(doc, y, [
    { label: "12E. Street/Village", value: a.street, flex: 3 },
    { label: "12F. House No.", value: a.houseNumber, flex: 2 },
  ]);

  y = drawRow(doc, y, [
    { label: "13. Email", value: contact.email },
    { label: "14. Phone No. *", value: contact.phoneNumber },
  ]);

  return y;
};
