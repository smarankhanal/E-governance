import React, { useState } from "react";
import { useFormContext } from "react-hook-form";

export default function AddDocumentType({
  documents,
  setSelectedDocument,
  onClose,
}) {
  const { setValue } = useFormContext();

  const [documentName, setDocumentName] = useState("");

  const handleAddDocument = () => {
    const name = documentName.trim();

    if (!name) {
      alert("Please enter a document name.");
      return;
    }

    const id = `${name.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`;

    const newDocument = {
      id,
      label: name,
      required: false,
      maxScans: 1,
      files: [],
    };

    const updatedDocuments = [...documents, newDocument];

    setValue("documents", updatedDocuments, {
      shouldDirty: true,
      shouldValidate: true,
    });

    setSelectedDocument(id);

    setDocumentName("");

    onClose();
  };

  const handleCancel = () => {
    setDocumentName("");
    onClose();
  };

  return (
    <div className="mt-4 w-full max-w-45 rounded-lg border border-slate-300 bg-white p-4">
      <label className="mb-2 block font-serif text-primary">
        Document name
      </label>

      <input
        type="text"
        value={documentName}
        onChange={(event) => setDocumentName(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            handleAddDocument();
          }
        }}
        placeholder="Enter document name"
        className="w-full rounded-md border border-slate-300 px-4 py-3 outline-none focus:border-accent focus:ring-1 focus:ring-accent"
      />

      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={handleAddDocument}
          className="rounded-md bg-primary px-4 py-2 text-text-on-primary transition hover:bg-primary-hover"
        >
          Add
        </button>

        <button
          type="button"
          onClick={handleCancel}
          className="rounded-md bg-slate-300 px-4 py-2 transition hover:bg-slate-400"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
