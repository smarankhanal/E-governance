import React from "react";
import { useFormContext } from "react-hook-form";
import { FiFolder, FiPlusCircle, FiX } from "react-icons/fi";

export default function DocumentTypeList({
  documents,
  selectedDocument,
  setSelectedDocument,
  onAddDocument,
  defaultDocuments = [],
}) {
  const { setValue } = useFormContext();

  const handleRemoveDocument = (id) => {
    const documentToRemove = documents.find((document) => document.id === id);

    if (!documentToRemove) return;

    documentToRemove.files?.forEach((file) => {
      if (file.preview) {
        URL.revokeObjectURL(file.preview);
      }
    });

    const updatedDocuments = documents.filter((document) => document.id !== id);

    setValue("documents", updatedDocuments, {
      shouldDirty: true,
      shouldValidate: true,
    });

    if (selectedDocument === id) {
      const nextDocument = updatedDocuments[0];

      setSelectedDocument(nextDocument ? nextDocument.id : "");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-45 overflow-hidden rounded-lg border border-slate-300 bg-white">
        {documents.map((document) => {
          const isSelected = selectedDocument === document.id;

          const isDefaultDocument = defaultDocuments.includes(document.id);

          return (
            <button
              key={document.id}
              type="button"
              onClick={() => setSelectedDocument(document.id)}
              className={`relative flex w-full flex-col items-center justify-center border-b border-slate-200 px-5 py-5 text-center transition ${
                isSelected ? "bg-[#e5f0ff]" : "bg-white hover:bg-slate-50"
              }`}
            >
              {!isDefaultDocument && (
                <span
                  onClick={(event) => {
                    event.stopPropagation();
                    handleRemoveDocument(document.id);
                  }}
                  title="Remove document"
                  className="absolute right-2 top-2 cursor-pointer text-red-500 transition hover:text-red-700"
                >
                  <FiX size={18} />
                </span>
              )}

              <FiFolder
                size={48}
                strokeWidth={1.7}
                className={isSelected ? "text-red-500" : "text-[#405d7c]"}
              />

              <span
                className={`mt-2 font-serif text-[18px] leading-9 ${
                  isSelected ? "text-red-500" : "text-[#405d7c]"
                }`}
              >
                {document.label}
              </span>

              {document.files?.length > 0 && (
                <span className="mt-1 rounded-full bg-[#2F5F98] px-3 py-1 text-xs text-white">
                  {document.files.length}/{document.maxScans}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={onAddDocument}
        className="mt-6 flex items-center gap-2 rounded-lg bg-[#2F5F98] px-7 py-3 font-serif text-lg text-white transition hover:bg-[#254f80]"
      >
        <FiPlusCircle size={23} />
        Add
      </button>
    </div>
  );
}
