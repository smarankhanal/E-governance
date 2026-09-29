// Shared layout constants + drawing helpers (all units in mm, A4 portrait)
export const PAGE = { marginX: 10, contentW: 182, gap: 4 };
export const FIELD_H = 5.5; // input box height
export const ROW_PITCH = 9.7; // vertical distance between field rows

const isEmpty = (v) => v === undefined || v === null || v === "";

/** First non-empty value (e.g. pick(a.provinceName, a.province)) */
export const pick = (...values) => values.find((v) => !isEmpty(v)) ?? "";

/** Lower-case, strip everything except a-z0-9 (for loose enum matching) */
export const norm = (v) =>
  String(v ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
export const has = (value, ...keys) =>
  keys.some((k) => norm(value).includes(k));

export const fullName = (...parts) =>
  parts.filter((p) => !isEmpty(p)).join(" ");

export const formatDate = (v) => {
  if (isEmpty(v)) return "";
  if (typeof v === "string" && /^\d{4}-\d{2}-\d{2}/.test(v))
    return v.slice(0, 10);
  const d = v instanceof Date ? v : new Date(v);
  if (Number.isNaN(d.getTime())) return String(v);
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
};

export const sexCode = (g) => {
  const n = norm(g);
  if (!n) return "";
  if (n.startsWith("m")) return "M";
  if (n.startsWith("f")) return "F";
  return "X";
};

export const drawSectionTitle = (doc, text, y) => {
  doc.setTextColor(0).setFont("helvetica", "bold").setFontSize(10);
  doc.text(text, PAGE.marginX, y);
  return y + 4;
};

/** One labelled input box. `hint` = optional array of tiny legend lines to the right. */
export const drawField = (doc, { label, value, x, y, w, hint }) => {
  const boxW = hint ? Math.min(12, w) : w;
  doc.setTextColor(0).setDrawColor(0).setLineWidth(0.2);
  doc.setFont("helvetica", "normal").setFontSize(6.5);
  doc.text(label, x, y);
  doc.rect(x, y + 1, boxW, FIELD_H);

  const text = String(value ?? "");
  if (text) {
    let size = 8.5;
    doc.setFontSize(size);
    while (size > 5 && doc.getTextWidth(text) > boxW - 3) {
      size -= 0.5;
      doc.setFontSize(size);
    }
    doc.text(text, x + 1.5, y + 1 + FIELD_H * 0.68);
  }

  if (hint) {
    doc.setFontSize(4.5);
    hint.forEach((line, i) => doc.text(line, x + boxW + 2, y + 2.4 + i * 1.7));
  }
};

/**
 * A row of fields sharing the content width. `flex` sets relative widths.
 * Returns the y of the next row.
 */
export const drawRow = (doc, y, fields) => {
  const usable = PAGE.contentW - PAGE.gap * (fields.length - 1);
  const totalFlex = fields.reduce((s, f) => s + (f.flex ?? 1), 0);
  let x = PAGE.marginX;
  fields.forEach((f) => {
    const w = (usable * (f.flex ?? 1)) / totalFlex;
    drawField(doc, { ...f, x, y, w });
    x += w + PAGE.gap;
  });
  return y + ROW_PITCH;
};

/** Small square checkbox + label. Returns the x where the next item can start. */
export const drawCheckbox = (doc, { x, y, label, checked }) => {
  const s = 3;
  doc.setDrawColor(0).setTextColor(0).setLineWidth(0.2);
  doc.rect(x, y - s + 0.4, s, s);
  if (checked) {
    doc.setFont("helvetica", "bold").setFontSize(7);
    doc.text("X", x + s / 2, y - 0.2, { align: "center" });
  }
  doc.setFont("helvetica", "normal").setFontSize(6.5);
  doc.text(label, x + s + 1.5, y);
  return x + s + 1.5 + doc.getTextWidth(label) + 4;
};

export const drawCheckRow = (doc, { x, y, options }) => {
  let cx = x;
  options.forEach((o) => {
    cx = drawCheckbox(doc, { x: cx, y, label: o.label, checked: !!o.checked });
  });
};

/** URL (from a bundler import) or data URL -> data URL that jsPDF can embed */
export const loadImageAsDataUrl = async (src) => {
  if (!src || String(src).startsWith("data:")) return src;
  const blob = await (await fetch(src)).blob();
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = reject;
    r.readAsDataURL(blob);
  });
};
export const calculateAge = (dateOfBirth) => {
  if (!dateOfBirth) return null;

  const dob = new Date(dateOfBirth);
  const today = new Date();

  let age = today.getFullYear() - dob.getFullYear();

  const monthDiff = today.getMonth() - dob.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }

  return age;
};
