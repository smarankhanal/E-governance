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

const conditionalDocumentIds = ["minor", "citizenship"];

const commonDocumentIds = ["marriage", "national-id", "academic"];

export default function DocumentForm() {
  const { control, getValues, setValue } = useFormContext();

  const documents =
    useWatch({
      control,
      name: "documents",
    }) || [];

  const dateOfBirth = useWatch({
    control,
    name: "personalDetails.personal.dateOfBirth_AD",
    defaultValue: "",
  });

  const { age } = useAgeValidation(dateOfBirth);

  const isMinor = age !== null && age < 16;

  const conditionalDocumentId = isMinor ? "minor" : "citizenship";

  const defaultDocuments = [conditionalDocumentId, ...commonDocumentIds];

  const [selectedDocument, setSelectedDocument] = useState("");

  const [showAddDocument, setShowAddDocument] = useState(false);

  useEffect(() => {
    const currentDocuments = getValues("documents") || [];

    const currentConditionalDocument = currentDocuments.find((document) =>
      conditionalDocumentIds.includes(document.id),
    );

    const documentsWithoutConditional = currentDocuments.filter(
      (document) => !conditionalDocumentIds.includes(document.id),
    );

    const updatedDocuments = [];

    const newConditionalDocument =
      currentConditionalDocument?.id === conditionalDocumentId
        ? currentConditionalDocument
        : {
            ...documentDefinitions[conditionalDocumentId],
            files: [],
          };

    updatedDocuments.push(newConditionalDocument);

    commonDocumentIds.forEach((id) => {
      const existingDocument = currentDocuments.find(
        (document) => document.id === id,
      );

      if (existingDocument) {
        updatedDocuments.push(existingDocument);
      } else {
        updatedDocuments.push({
          ...documentDefinitions[id],
          files: [],
        });
      }
    });

    const customDocuments = documentsWithoutConditional.filter(
      (document) => !commonDocumentIds.includes(document.id),
    );

    updatedDocuments.push(...customDocuments);

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
  }, [conditionalDocumentId, getValues, setValue]);

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
            defaultDocuments={defaultDocuments}
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
