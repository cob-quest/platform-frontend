"use client"
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { CursorArrowRaysIcon } from "@heroicons/react/24/solid";
import axios from "axios";

const FileUpload = () => {
  const [uploadedFileNames, setUploadedFileNames] = useState([]); // State to store uploaded file names

  const onDrop = async (acceptedFiles) => {
    const formData = new FormData();
    formData.append("image_file", acceptedFiles[0]);

    try {
      const response = await axios.post(
        "http://localhost:80/api/v1/trigger/image/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": "Basic " + btoa("test:test"), // Basic Auth
          },
        }
      );

      console.log("File upload response:", response.data);
      console.log(response.status);

      // Add the uploaded file name to the state
      setUploadedFileNames([...uploadedFileNames, acceptedFiles[0].name]);
    } catch (error) {
      console.error("File upload error:", error);
      if (error.response) {
        console.log(error.response.status); // Access the status code from the error response
      }
    }
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
          Click to select your files and create an image{" "}
          <span>
            {" "}
            <CursorArrowRaysIcon className="h-4 w-4" />{" "}
          </span>{" "}
        </p>
      )}

      {uploadedFileNames.length > 0 && (
        <div>
          <p>Uploaded file: </p>
          <ul>
            {uploadedFileNames.map((fileName, index) => (
              <li key={index}>{fileName}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
