import { PAGE, drawCheckRow, has } from "../utils";

// Assumed keys on `data` (add them to your form state / API response):
//   serviceType:     "regular" | "emergency"
//   applicationType: "new" | "renewal" | "damaged" | "lost"
//   documentType:    "ordinary34" | "ordinary66" | "temporary" | "travel" | "diplomatic" | "official" | "service"
export const drawOfficeUse = (doc, data, y) => {
  const x0 = PAGE.marginX;
  const svc = data?.serviceType;
  const app = data?.applicationType;
  const docType = data?.documentType;

  // dashed separator
  doc.setDrawColor(0).setLineWidth(0.2).setLineDashPattern([1, 1], 0);
  doc.line(x0, y, x0 + PAGE.contentW, y);
  doc.setLineDashPattern([], 0);

  doc.setTextColor(0).setFont("helvetica", "bold").setFontSize(6.5);
  doc.text("FOR OFFICE USE ONLY", x0, y + 3);
  doc.setFont("helvetica", "normal");
  doc.text(
    'Please fill in the appropriate box with an "X" mark.',
    x0 + 34,
    y + 3,
  );

  const bx = x0 + 28;
  const r1 = y + 8;
  const pitch = 4.5;

  doc.text("Application Type", x0, r1);
  drawCheckRow(doc, {
    x: bx,
    y: r1,
    options: [
      { label: "Regular", checked: has(svc, "regular") },
      { label: "Emergency", checked: has(svc, "emergency") },
    ],
  });
  drawCheckRow(doc, {
    x: bx,
    y: r1 + pitch,
    options: [
      { label: "New", checked: has(app, "new") },
      { label: "Renewal", checked: has(app, "renew") },
      { label: "Damaged", checked: has(app, "damage") },
      { label: "Lost", checked: has(app, "lost", "stolen") },
    ],
  });

  doc.setFont("helvetica", "normal").setFontSize(6.5);
  doc.text("Document Type", x0, r1 + pitch * 2);
  drawCheckRow(doc, {
    x: bx,
    y: r1 + pitch * 2,
    options: [
      { label: "Ordinary (34 Pages)", checked: has(docType, "34") },
      { label: "Ordinary (66 Pages)", checked: has(docType, "66") },
      { label: "Temporary", checked: has(docType, "temporary") },
      { label: "Travel Document", checked: has(docType, "travel") },
    ],
  });
  drawCheckRow(doc, {
    x: bx,
    y: r1 + pitch * 3,
    options: [
      { label: "Diplomatic", checked: has(docType, "diplomatic") },
      { label: "Official", checked: has(docType, "official") },
      { label: "Service", checked: has(docType, "service") },
    ],
  });

  // Verifying officer block
  const vx = 146;
  doc.setFont("helvetica", "bold").setFontSize(6.5);
  doc.text("Verifying Officer", vx, y + 3);
  doc.setFont("helvetica", "normal");
  ["Name:", "Signature:", "Designation:", "Date:"].forEach((label, i) => {
    const ly = r1 + i * pitch;
    doc.text(label, vx, ly);
    doc.line(vx + 16, ly + 0.6, x0 + PAGE.contentW, ly + 0.6);
  });

  return r1 + pitch * 3 + 2;
};
