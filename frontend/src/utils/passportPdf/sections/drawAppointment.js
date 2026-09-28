import { PAGE, formatDate, pick } from "../utils";

// My own wording - replace with the official declaration text if you have it.
const DECLARATION =
  "I hereby declare that the information given in this application is true and correct to the best of my knowledge. " +
  "I understand that providing false or misleading information is punishable under the prevailing laws of Nepal.";

// Declaration + signature line + appointment details box
export const drawAppointment = (doc, data, y) => {
  const ap = data?.appointment ?? {};
  const x0 = PAGE.marginX;
  doc.setTextColor(0).setDrawColor(0).setLineWidth(0.2);

  // Declaration
  doc.setFont("helvetica", "normal").setFontSize(6);
  const lines = doc.splitTextToSize(DECLARATION, PAGE.contentW);
  const top = y + 1;
  doc.text(lines, x0, top);
  const blockY = top + lines.length * 2.6 + 3;

  // Signature + date lines
  const lineY = blockY + 6;
  doc.line(x0, lineY, x0 + 70, lineY);
  doc.setFontSize(6.5);
  doc.text(
    "Applicant's Signature / Signature of Guardian, in case of minor",
    x0,
    lineY + 3,
  );
  doc.line(x0 + 78, lineY, x0 + 104, lineY);
  doc.text("Date *", x0 + 78, lineY + 3);

  // Appointment details (right)
  const ax = 120;
  const when = [formatDate(ap.appointmentDate), ap.appointmentTime]
    .filter(Boolean)
    .join(" ");
  doc.setFont("helvetica", "bold").setFontSize(7);
  doc.text("Appointment Details", ax, blockY);
  doc.setFont("helvetica", "normal").setFontSize(6.5);
  doc.text("Enrollment Center", ax, blockY + 4.5);
  doc.text(String(pick(ap.locationName, ap.location)), ax + 26, blockY + 4.5);
  doc.text("Date & Time", ax, blockY + 9);
  doc.text(when, ax + 26, blockY + 9);

  return lineY + 6;
};
