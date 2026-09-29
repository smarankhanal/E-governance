import jsPDF from "jspdf";

import { drawHeader } from "./sections/drawHeader";
import { drawPersonalInformation } from "./sections/drawPersonalInformation";
import { drawAddress } from "./sections/drawAddress";
import { drawParentInformation } from "./sections/drawParentInformation";
import { drawTemporaryAddress } from "./sections/drawTemporaryAddress";
import { drawAppointment } from "./sections/drawAppointment";
import { drawOfficeUse } from "./sections/drawOfficeUse";
import { drawQRCode } from "./sections/drawQRCode";
import logo from "../../assets/images/Passport.png";
import { drawContact } from "./sections/drawContact";
import { drawProxy } from "./sections/drawProxy";
export const generatePassportPDF = async (data) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  let y = 15;
  y = await drawHeader(doc, data, y, logo);
  y = drawPersonalInformation(doc, data, y);
  y = drawAddress(doc, data, y);
  y = drawParentInformation(doc, data, y);
  y = drawTemporaryAddress(doc, data, y);
  y = drawContact(doc, data, y);
  y = drawProxy(doc, data, y);
  y = drawAppointment(doc, data, y);
  y = drawOfficeUse(doc, data, y);

  await drawQRCode(doc, data);

  doc.save(`passport-application-${data.applicationId}.pdf`);
  return y;
};
