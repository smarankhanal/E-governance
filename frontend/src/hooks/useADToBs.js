import { adToBs } from "@sbmdkl/nepali-date-converter";

export default function useADToBs() {
  const convertADToBS = (date) => {
    if (!date) return "";

    try {
      let adDate;

      if (date instanceof Date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        adDate = `${year}-${month}-${day}`;
      } else if (typeof date === "string") {
        adDate = date;
      } else {
        return "";
      }

      return adToBs(adDate);
    } catch (error) {
      console.error("AD to BS conversion error:", error);
      return "";
    }
  };

  return { convertADToBS };
}
