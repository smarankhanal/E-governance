import QRCode from "qrcode";

export const drawQRCode = async (doc, data) => {
  const qrData = JSON.stringify({
    applicationId: data.applicationId,
    status: data.status,
  });

  const qrCode = await QRCode.toDataURL(qrData, {
    width: 150,
    margin: 1,
  });

  doc.addImage(qrCode, "PNG", 158, 8, 32, 32);
};
