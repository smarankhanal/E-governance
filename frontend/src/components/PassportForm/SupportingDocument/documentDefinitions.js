export const documentDefinitions = {
  minor: {
    id: "minor",
    label: "Minor",
    required: true,
    maxScans: 2,
  },

  citizenship: {
    id: "citizenship",
    label: "Citizenship",
    required: true,
    maxScans: 2,
  },

  passport: {
    id: "passport",
    label: "Passport",
    required: true,
    maxScans: 2,
  },

  police_report: {
    id: "police_report",
    label: "Police Report",
    required: true,
    maxScans: 1,
  },

  marriage: {
    id: "marriage",
    label: "Marriage",
    required: false,
    maxScans: 1,
  },

  national_id: {
    id: "national_id",
    label: "National ID",
    required: false,
    maxScans: 1,
  },

  academic: {
    id: "academic",
    label: "Academic",
    required: false,
    maxScans: 1,
  },
};

export const commonDocumentIds = ["marriage", "national_id", "academic"];

export const conditionalDocumentIds = [
  "minor",
  "citizenship",
  "passport",
  "police_report",
];
