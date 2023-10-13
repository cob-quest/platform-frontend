import FileUpload from "@/components/file-upload/FileUpload";
import React from "react";

export default function CreateChallenge() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      
        <h1>ZIP File Upload</h1>
        <FileUpload />
    </main>
  );
}

// drag drop (zip file)
// mailing list (but idk the format yet)
// set time (but idk the format yet)
