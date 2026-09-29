import { PAGE, drawSectionTitle, drawRow, pick } from "../utils";

export const drawTemporaryAddress = (doc, data, y) => {
  const address = data?.temporaryAddress ?? {};

  y = drawSectionTitle(doc, "17. Temporary Address", y + 1);

  doc.setFont("helvetica", "bold").setFontSize(7).setTextColor(0);

  doc.text("17A. Address", PAGE.marginX, y + 0.5);
  y += 3.5;

  y = drawRow(doc, y, [
    {
      label: "17B. Province *",
      value: pick(address.provinceName, address.province),
    },
    {
      label: "17C. District *",
      value: pick(address.districtName, address.district),
    },
  ]);

  y = drawRow(doc, y, [
    {
      label: "17D. Rural Municipality/Municipality *",
      value: pick(address.municipalityName, address.municipality),
      flex: 4,
    },
    {
      label: "17E. Ward No. *",
      value: address.ward,
      flex: 1,
    },
  ]);

  y = drawRow(doc, y, [
    {
      label: "17F. Street/Village *",
      value: pick(address.tole, address.street),
      flex: 3,
    },
    {
      label: "17G. House No.",
      value: address.houseNumber,
      flex: 2,
    },
  ]);

  return y;
};
