import { PAGE, loadImageAsDataUrl } from "../utils";

/**
 * `logo` can be a bundler-imported URL (import logo from "../assets/emblem.png")
 * or a base64 data URL. It is drawn top-left, fitted inside a 20x20 mm box.
 */
export const drawHeader = async (doc, data, y, logo = data?.logo) => {
  const cx = 92; // centre of the title block (between logo and QR)
  doc.setTextColor(0);

  if (logo) {
    try {
      const src = await loadImageAsDataUrl(logo);
      const fmt = /^data:image\/(jpe?g)/i.test(src) ? "JPEG" : "PNG";
      const { width, height } = doc.getImageProperties(src);
      const box = 20;
      const scale = Math.min(box / width, box / height);
      const w = width * scale;
      const h = height * scale;
      doc.addImage(
        src,
        fmt,
        PAGE.marginX + (box - w) / 2,
        y - 3 + (box - h) / 2,
        w,
        h,
      );
    } catch (e) {
      console.warn("Logo could not be loaded, skipping it", e);
    }
  }

  doc.setFont("helvetica", "bold").setFontSize(10);
  doc.text("GOVERNMENT OF NEPAL", cx, y + 2, { align: "center" });

  doc.setFont("helvetica", "normal").setFontSize(8.5);
  doc.text(
    "Ministry of Foreign Affairs, Department of Passports",
    cx,
    y + 6.5,
    {
      align: "center",
    },
  );

  doc.setFont("helvetica", "bold").setFontSize(13);
  doc.text("ePASSPORT APPLICATION FORM", cx, y + 13, { align: "center" });

  return y + 21;
};
