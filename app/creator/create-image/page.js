import React from "react";
import FileUpload from "@/components/file-upload/FileUpload";

const CreateImage = () => {
  return (
    <main>
      <div>
        <h2 className="underline">
          <i>ZIP File Upload</i>
        </h2>
        <FileUpload />
      </div>
    </main>
  );
};

export default CreateImage;
