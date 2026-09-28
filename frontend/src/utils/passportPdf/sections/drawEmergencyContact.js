import { PAGE, drawSectionTitle, drawRow, fullName, pick } from "../utils";

// Assumes: name -> proxyDetails, address -> temporaryAddress.
// Emergency phone/email: add `phoneNumber` / `email` to proxyDetails (or data.emergencyContact).
export const drawEmergencyContact = (doc, data, y) => {
  const proxy = data?.proxyDetails ?? {};
  const em = data?.emergencyContact ?? {};
  const a = data?.temporaryAddress ?? {};

  y = drawSectionTitle(doc, "17. Contact details in case of emergency", y + 1);

  y = drawRow(doc, y, [
    {
      label: "17A. Full Name *",
      value: fullName(proxy.firstName, proxy.surname),
    },
  ]);

  doc.setFont("helvetica", "bold").setFontSize(7).setTextColor(0);
  doc.text("17B. Address", PAGE.marginX, y + 0.5);
  y += 3.5;

  y = drawRow(doc, y, [
    { label: "17C. Province *", value: pick(a.provinceName, a.province) },
    { label: "17D. District *", value: pick(a.districtName, a.district) },
  ]);

  y = drawRow(doc, y, [
    {
      label: "17E. Rural Municipality/Municipality *",
      value: pick(a.municipalityName, a.municipality),
      flex: 4,
    },
    { label: "17F. Ward No. *", value: a.ward, flex: 1 },
  ]);

  y = drawRow(doc, y, [
    { label: "17G. Street/Village *", value: pick(a.tole, a.street), flex: 3 },
    { label: "17H. House No.", value: a.houseNumber, flex: 2 },
  ]);

  y = drawRow(doc, y, [
    { label: "18. Email", value: pick(proxy.email, em.email) },
    {
      label: "19. Phone No. *",
      value: pick(proxy.phoneNumber, em.phoneNumber),
    },
  ]);

  return y;
};
