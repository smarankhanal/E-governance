import React, { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";

import DocumentTypeList from "../SupportingDocument/DocumentTypeList";
import AddDocumentType from "../SupportingDocument/AddDocumentType";
import DocumentUpload from "../SupportingDocument/DocumentUpload";

import { useAgeValidation } from "../../../hooks/useAgeValidation";

const documentDefinitions = {
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

  "passport-front": {
    id: "passport-front",
    label: "Passport Front",
    required: true,
    maxScans: 1,
  },

  "passport-back": {
    id: "passport-back",
    label: "Passport Back",
    required: true,
    maxScans: 1,
  },

  "police-report": {
    id: "police-report",
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

  "national-id": {
    id: "national-id",
    label: "National ID",
    required: false,
    maxScans: 1,
  },

  academic: {
    id: "academic",
    label: "Academic",
    required: false,
    maxScans: 2,
  },
};

const commonDocumentIds = ["marriage", "national-id", "academic"];

const conditionalDocumentIds = [
  "minor",
  "citizenship",
  "passport-front",
  "passport-back",
  "police-report",
];

const getRequiredDocumentIds = (applicationType, isMinor) => {
  switch (applicationType) {
    case "first-issuance":
      return [isMinor ? "minor" : "citizenship"];

    case "renewal":
      return ["passport-front", "passport-back"];

    case "lost-stolen":
      return ["police-report"];

    case "damaged":
      return ["passport-front", "passport-back"];

    default:
      return [];
  }
};

export default function DocumentForm() {
  const { control, getValues, setValue } = useFormContext();

  const documents =
    useWatch({
      control,
      name: "documents",
    }) || [];

  const applicationType = useWatch({
    control,
    name: "application.applicationType",
    defaultValue: "",
  });

  const dateOfBirth = useWatch({
    control,
    name: "personalDetails.personal.dateOfBirth_AD",
    defaultValue: "",
  });

  const { age } = useAgeValidation(dateOfBirth);

  const isMinor = age !== null && age < 16;

  const requiredDocumentIds = getRequiredDocumentIds(applicationType, isMinor);

  const defaultDocumentIds = [...requiredDocumentIds, ...commonDocumentIds];

  const [selectedDocument, setSelectedDocument] = useState("");

  const [showAddDocument, setShowAddDocument] = useState(false);

  useEffect(() => {
    if (!applicationType) return;

    const currentDocuments = getValues("documents") || [];

    const requiredDocuments = requiredDocumentIds.map((id) => {
      const existingDocument = currentDocuments.find(
        (document) => document.id === id,
      );

      if (existingDocument) {
        return {
          ...existingDocument,
          required: true,
        };
      }

      return {
        ...documentDefinitions[id],
        files: [],
      };
    });

    const commonDocuments = commonDocumentIds.map((id) => {
      const existingDocument = currentDocuments.find(
        (document) => document.id === id,
      );

      if (existingDocument) {
        return {
          ...existingDocument,
          required: false,
        };
      }

      return {
        ...documentDefinitions[id],
        files: [],
      };
    });

    const defaultIds = [...requiredDocumentIds, ...commonDocumentIds];

    const customDocuments = currentDocuments.filter(
      (document) =>
        !defaultIds.includes(document.id) &&
        !conditionalDocumentIds.includes(document.id),
    );

    const updatedDocuments = [
      ...requiredDocuments,
      ...commonDocuments,
      ...customDocuments,
    ];

    const currentIds = currentDocuments.map((document) => document.id);

    const updatedIds = updatedDocuments.map((document) => document.id);

    const documentsChanged =
      currentIds.length !== updatedIds.length ||
      currentIds.some((id, index) => id !== updatedIds[index]);

    if (documentsChanged) {
      setValue("documents", updatedDocuments, {
        shouldDirty: false,
        shouldValidate: false,
      });
    }
  }, [
    applicationType,
    isMinor,
    requiredDocumentIds.join(","),
    getValues,
    setValue,
  ]);

  useEffect(() => {
    if (!documents.length) {
      setSelectedDocument("");
      return;
    }

    const selectedExists = documents.some(
      (document) => document.id === selectedDocument,
    );

    if (!selectedExists) {
      setSelectedDocument(documents[0].id);
    }
  }, [documents, selectedDocument]);

  return (
    <div className="w-full px-4 py-6 sm:px-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[220px_1fr]">
        <div>
          <DocumentTypeList
            documents={documents}
            selectedDocument={selectedDocument}
            setSelectedDocument={setSelectedDocument}
            onAddDocument={() => setShowAddDocument(true)}
            defaultDocuments={defaultDocumentIds}
          />

          {showAddDocument && (
            <AddDocumentType
              documents={documents}
              setSelectedDocument={setSelectedDocument}
              onClose={() => setShowAddDocument(false)}
            />
          )}
        </div>

        <DocumentUpload
          documents={documents}
          selectedDocument={selectedDocument}
        />
      </div>
    </div>
  );
}
