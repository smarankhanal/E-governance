export const getRequiredDocumentIds = (applicationType, isMinor) => {
  const identityDocument = isMinor ? "minor" : "citizenship";

  switch (applicationType) {
    case "NEW":
      return [identityDocument];

    case "RENEWAL":
      return [identityDocument, "passport"];

    case "LOST/STOLEN":
      return [identityDocument];

    case "DAMAGED":
      return [identityDocument, "passport"];

    case "DATA CORRECTION":
      return [identityDocument, "passport"];

    default:
      return [identityDocument];
  }
};
