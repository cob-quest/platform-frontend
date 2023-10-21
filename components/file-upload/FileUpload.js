"use client";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { CursorArrowRaysIcon } from "@heroicons/react/24/solid";
import axios from "axios";

const FileUpload = () => {
  const [uploadedFileNames, setUploadedFileNames] = useState([]); // State to store uploaded file names
  // const [imageName, setImageName] = useState(""); // State for imageName
  // const [creatorName, setCreatorName] = useState(""); // State for creatorName

  const onDrop = async (acceptedFiles) => {
    const inputImageName = prompt("Enter image name (e.g., the-image:latest):");
    const inputCreatorName = prompt("Enter creator name (e.g., John):");

    if (!inputImageName || !inputCreatorName) {
      alert("Both image name and creator name are required.");
      return;
    }

    const formData = new FormData();
    formData.append("imageFile", acceptedFiles[0]);
    formData.append("imageName", inputImageName); // Use the state value
    formData.append("creatorName", inputCreatorName); // Use the state value

    // Log the content of the formData
    console.log("Form Data Contents:");
    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      const response = await axios.post(
        "http://localhost:80/api/v1/trigger/image/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Basic " + btoa("test:test"), // Basic Auth
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
          Click to upload your file(s) and create an image{" "}
          <span>
            {" "}
            <CursorArrowRaysIcon className="h-4 w-4" />{" "}
          </span>{" "}
        </p>
      )}

      {uploadedFileNames.length > 0 && (
        <div>
          <p>Image created: </p>
          <ul className="text-white">
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
