import type { ChangeEvent } from "react";
import { useState } from "react";

type UploadStatus = "idle" | "uploading" | "success" | "error";

export function FileUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<UploadStatus>("idle");

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  }

  async function handleFileUpload() {
    if (!file) return;

    setStatus("uploading");

    const formData = new FormData();
    formData.append("file", file);
  }

  return (
    <div className="space-y-2">
      <input type="file" onChange={handleFileChange} />

      {file && (
        <div className="mb-4 text-sm">
          <p>File name: {file.name}</p>
        </div>
      )}

      {file && status !== "uploading" && <button onClick={handleFileUpload}>Upload</button>}

      {status === "success" && <p className="text-sm text-green-600">File uploaded successfully!</p>}

      {status === "error" && <p className="text-sm text-red-600">Upload failed. Please try again.</p>}
    </div>
  );
}
