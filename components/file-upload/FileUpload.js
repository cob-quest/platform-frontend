"use client";
import React from "react";
import { useDropzone } from "react-dropzone";
import { CursorArrowRaysIcon } from "@heroicons/react/24/solid";

const FileUpload = () => {
  const onDrop = (acceptedFiles) => {
    // Handle the uploaded files (e.g., send them to a server)
    acceptedFiles.forEach((file) => {
      console.log(`Uploaded file: ${file.name}`);
      // upload to dest
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      className={`dropzone ${isDragActive ? "active" : ""}`}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here...</p>
      ) : (
        <p>
          Drag 'n' drop some ZIP files here, or click to select files{" "}
          <span>
            {" "}
            <CursorArrowRaysIcon className="h-4 w-4" />{" "}
          </span>{" "}
        </p>
      )}
    </div>
  );
};

export default FileUpload;
