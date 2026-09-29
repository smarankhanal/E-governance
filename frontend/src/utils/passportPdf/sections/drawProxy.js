import { drawSectionTitle, drawRow, pick, fullName } from "../utils";

export const drawProxy = (doc, data, y) => {
  const p = data?.proxyDetails ?? {};

  const hasProxy = Object.values(p).some(
    (value) => value !== undefined && value !== null && value !== "",
  );

  y = drawSectionTitle(doc, "19. Proxy Details", y + 1);

  y = drawRow(doc, y, [
    {
      label: "19A. Proxy *",
      value: hasProxy ? pick(p.proxy) : "----",
    },
    {
      label: "19B. Full Name *",
      value: hasProxy ? fullName(p.firstName, p.surname) : "----",
    },
  ]);

  return y;
};
