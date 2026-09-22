import React from "react";
import { useFormContext } from "react-hook-form";
import { FiImage, FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";

export default function DocumentPreview({
  documents,
  selectedDocument,
  currentFileIndex,
  setCurrentFileIndex,
}) {
  const { setValue } = useFormContext();

  const selected = documents.find(
    (document) => document.id === selectedDocument,
  );

  const currentFile = selected?.files?.[currentFileIndex];

  const handlePrevious = () => {
    if (!selected?.files.length) return;

    setCurrentFileIndex((index) =>
      index === 0 ? selected.files.length - 1 : index - 1,
    );
  };

  const handleNext = () => {
    if (!selected?.files.length) return;

    setCurrentFileIndex((index) =>
      index === selected.files.length - 1 ? 0 : index + 1,
    );
  };

  const handleRemoveFile = () => {
    if (!selected || !currentFile) return;

    if (currentFile.preview) {
      URL.revokeObjectURL(currentFile.preview);
    }

    const updatedDocuments = documents.map((document) => {
      if (document.id !== selectedDocument) {
        return document;
      }

      return {
        ...document,
        files: document.files.filter((file) => file.id !== currentFile.id),
      };
    });

    setValue("documents", updatedDocuments, {
      shouldDirty: true,
      shouldValidate: true,
    });

    setCurrentFileIndex(0);
  };

  return (
    <div className="mt-6">
      {/* Preview area */}
      <div className="flex items-center justify-center gap-8">
        {/* Previous */}
        <button
          type="button"
          onClick={handlePrevious}
          disabled={!selected?.files.length || selected.files.length <= 1}
          className="text-slate-400 transition hover:text-[#2F5F98] disabled:cursor-not-allowed disabled:opacity-30"
        >
          <FiChevronLeft size={35} />
        </button>

        {/* Current file */}
        <div className="flex flex-col items-center">
          <div className="relative flex h-60 w-60 items-center justify-center overflow-hidden rounded-lg border border-dashed border-slate-300 bg-white">
            {currentFile ? (
              <>
                <img
                  src={currentFile.preview}
                  alt={currentFile.name}
                  className="h-full w-full object-contain"
                />

                {/* Remove current file */}
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  title="Remove file"
                  className="absolute right-2 top-2 rounded-full bg-red-500 p-2 text-white transition hover:bg-red-600"
                >
                  <FiX size={18} />
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center text-center">
                <FiImage size={55} className="text-slate-400" />

                <p className="mt-4 max-w-45 font-serif text-lg font-semibold leading-8 text-[#495057]">
                  {selected?.label || "Select a document"}
                </p>
              </div>
            )}
          </div>

          {/* Filename */}
          <p className="mt-4 max-w-45 wrap-break-word text-center font-serif text-lg font-semibold text-[#495057]">
            {currentFile
              ? currentFile.name
              : selected
                ? `${selected.label} ${currentFileIndex + 1}`
                : ""}
          </p>

          {/* Required warning */}
          {selected?.required && selected.files.length < selected.maxScans && (
            <p className="mt-2 font-serif text-lg text-red-500">
              Required scan missing
            </p>
          )}
        </div>

        {/* Next */}
        <button
          type="button"
          onClick={handleNext}
          disabled={!selected?.files.length || selected.files.length <= 1}
          className="text-slate-400 transition hover:text-[#2F5F98] disabled:cursor-not-allowed disabled:opacity-30"
        >
          <FiChevronRight size={35} />
        </button>
      </div>

      {/* Pagination */}
      <div className="mt-12 flex justify-center gap-3">
        {Array.from({
          length: selected?.maxScans || 1,
        }).map((_, index) => (
          <span
            key={index}
            className={`h-3 w-12 transition ${
              index === currentFileIndex ? "bg-[#2F5F98]" : "bg-slate-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
