import React, { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useSelector } from "react-redux";

import DocumentTypeList from "../SupportingDocument/DocumentTypeList";
import AddDocumentType from "../SupportingDocument/AddDocumentType";
import DocumentUpload from "../SupportingDocument/DocumentUpload";

import { useAgeValidation } from "../../../hooks/useAgeValidation";
import { getRequiredDocumentIds } from "../SupportingDocument/documentUtils";
import {
  documentDefinitions,
  commonDocumentIds,
  conditionalDocumentIds,
} from "../SupportingDocument/documentDefinitions";
import NextButton from "../../Common/Button/NextButton";
import CancelButton from "../../Common/Button/CancelButton";
import BackButton from "../../Common/Button/BackButton";
export default function DocumentForm({ onCancel, onFormNext, onFormBack }) {
  const { control, getValues, setValue, isValid } = useFormContext();

  const passportType = useSelector((state) => state.passport.passportType);
  const applicationType = passportType?.keyword;
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

      return existingDocument
        ? {
            ...existingDocument,
            required: true,
          }
        : {
            ...documentDefinitions[id],
            files: [],
          };
    });

    const commonDocuments = commonDocumentIds.map((id) => {
      const existingDocument = currentDocuments.find(
        (document) => document.id === id,
      );

      return existingDocument
        ? {
            ...existingDocument,
            required: false,
          }
        : {
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
  const requiredDocumentsUploaded = documents
    .filter((document) => document.required)
    .every((document) => document.files?.length > 0);
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
      <div className="mt-16 flex items-center justify-between sm:mt-32">
        <div className="flex gap-6">
          <BackButton onClick={onFormBack} />

          <CancelButton onClick={onCancel} />
        </div>

        <NextButton
          type="submit"
          onClick={onFormNext}
          disabled={!requiredDocumentsUploaded}
        />
      </div>
    </div>
  );
}
