import React, { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { FiUpload, FiInfo } from "react-icons/fi";

import DocumentPreview from "./DocumentPreview";

export default function DocumentUpload({ documents, selectedDocument }) {
  const { setValue } = useFormContext();

  const fileInputRef = useRef(null);

  const [currentFileIndex, setCurrentFileIndex] = useState(0);

  const selected = documents.find(
    (document) => document.id === selectedDocument,
  );

  const handleUploadClick = () => {
    if (!selected) return;

    if (selected.files.length >= selected.maxScans) {
      alert(
        `Maximum ${selected.maxScans} scan${
          selected.maxScans > 1 ? "s" : ""
        } allowed.`,
      );

      return;
    }

    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (!file || !selected) return;

    // Maximum 1 MB
    const maxSize = 1024 * 1024;

    if (file.size > maxSize) {
      alert("Maximum file size is 1 MB.");

      event.target.value = "";

      return;
    }

    // Allowed types
    const allowedTypes = ["image/jpeg", "image/png", "image/tiff"];

    if (!allowedTypes.includes(file.type)) {
      alert("Only JPG, PNG and TIFF files are allowed.");

      event.target.value = "";

      return;
    }

    const newFile = {
      id: `${Date.now()}-${Math.random()}`,
      name: file.name,
      file,
      preview: URL.createObjectURL(file),
    };

    const updatedDocuments = documents.map((document) => {
      if (document.id !== selectedDocument) {
        return document;
      }

      return {
        ...document,
        files: [...document.files, newFile],
      };
    });

    setValue("documents", updatedDocuments, {
      shouldDirty: true,
      shouldValidate: true,
    });

    // Show newly uploaded file
    setCurrentFileIndex(selected.files.length);

    // Allow selecting the same file again
    event.target.value = "";
  };

  const handleClear = () => {
    if (!selected) return;

    selected.files.forEach((file) => {
      if (file.preview) {
        URL.revokeObjectURL(file.preview);
      }
    });

    const updatedDocuments = documents.map((document) =>
      document.id === selectedDocument
        ? {
            ...document,
            files: [],
          }
        : document,
    );

    setValue("documents", updatedDocuments, {
      shouldDirty: true,
      shouldValidate: true,
    });

    setCurrentFileIndex(0);
  };

  return (
    <div className="border-l border-[#2F5F98] pl-8">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        hidden
        accept=".jpg,.jpeg,.png,.tif,.tiff"
        onChange={handleFileChange}
      />

      {/* Upload / Clear */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleUploadClick}
          className="flex items-center gap-3 rounded-lg bg-[#2F5F98] px-8 py-4 font-serif text-lg font-semibold text-white transition hover:bg-[#254f80]"
        >
          <FiUpload size={25} />
          Upload
        </button>

        <button
          type="button"
          onClick={handleClear}
          disabled={!selected?.files.length}
          className="rounded-lg bg-[#9db5d2] px-8 py-4 font-serif text-lg font-semibold text-white transition disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          Clear
        </button>
      </div>

      {/* Uploaded files */}
      <h3 className="mt-4 text-center font-serif text-lg text-[#294e78]">
        UPLOADED FILES
      </h3>

      {/* Info */}
      <div className="mt-4 flex gap-4 rounded-lg bg-[#e5f0ff] px-5 py-5 text-[#2874e8]">
        <FiInfo size={25} className="mt-1 shrink-0" />

        <div className="font-serif text-lg leading-9">
          <p>Selected scan target: {selected?.label || "None"}</p>

          <p>
            Scans uploaded: {selected?.files.length || 0}/
            {selected?.maxScans || 0}
          </p>
        </div>
      </div>

      {/* Preview */}
      <DocumentPreview
        documents={documents}
        selectedDocument={selectedDocument}
        currentFileIndex={currentFileIndex}
        setCurrentFileIndex={setCurrentFileIndex}
      />
    </div>
  );
}
