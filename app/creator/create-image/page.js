"use client";
import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { CursorArrowRaysIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useRouter } from "next/navigation";

const CreateImage = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [history, setHistory] = useState([]);
  const [imageData, setImageData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadedFileNames, setUploadedFileNames] = useState([]); // State to store uploaded file names
  const [imageName, setImageName] = useState(""); // State for imageName
  const [creatorName, setCreatorName] = useState(""); // State for creatorName
  const [imageTag, setImageTag] = useState(""); // State for imageTag
  const [corId, setCorId] = useState(""); // State to store corID
  const [requestBody, setRequestBody] = useState({
    imageName: "someName",
    creatorName: "someCreator",
    imageTag: "someTag",
    // imageFile to be appended
  });
  // Process input command
  let newOutput = "";

  const router = useRouter();

  const onDrop = async (acceptedFiles) => {
    const formData = new FormData();
    formData.append("imageFile", acceptedFiles[0]);
    // formData.append("imageName", imageName); // Use the state value
    // formData.append("creatorName", creatorName); // Use the state value
    // formData.append("imageTag", imageTag); // Use the state value
    // Append additional fields from requestBody
    formData.append("imageName", requestBody.imageName);
    formData.append("creatorName", requestBody.creatorName);
    formData.append("imageTag", requestBody.imageTag);

    console.log("Request body:", requestBody);

    try {
      const response = await axios.post("/api/v1/platform/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Basic " + btoa("test:test"), // Basic Auth
        },
      });
      if (response.status === 200) {
        setCorId(response.data.corId);
        console.log("CorId:", response.data.corId);
        newOutput = (
          <p>
            <span className="user">[✔]</span> File has uploaded and image is
            starting to build! Check the status to see when it has finished
            building!
          </p>
        );
      } else {
        newOutput = (
          <p>
            <span className="user">[X]</span> Image upload failed. Please try
            again.
          </p>
        );
      }

      console.log("File upload response:", response.data);
      console.log(response.status);

      // Add the uploaded file name to the state
      setUploadedFileNames([...uploadedFileNames, acceptedFiles[0].name]);
    } catch (error) {
      console.error("File upload error:", error);
      if (error.response) {
        console.log(error.response.status); // Access the status code from the error response
        // Update the newOutput variable with the error message
        newOutput = (
          <p>
            <span className="user">[X]</span> File upload error. Please try
            again.
          </p>
        );
      }
    }
    setOutput(newOutput);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleInputChange = (e) => {
    setInput(e.target.value);
    e.target.size = e.target.value.length + 1;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setOutput("");

    if (input === "help") {
      newOutput = <Help />;
    } else if (input === "status") {
      if (corId) {
        try {
          const response = await axios.get(`/api/v1/platform/process/${corId}`);
          // Process the response from the process endpoint
          console.log("Process response:", response.data);
          console.log("Process response status:", response.eventStatus);
          console.log(
            "Process response data status:",
            response.data.eventStatus
          );
          newOutput = (
            <p>
              <span className="user">[✔]</span> Image status:{" "}
              {response.data.eventStatus}
            </p>
          );
          // You can update 'newOutput' based on the response from the process endpoint
        } catch (error) {
          // Handle errors from the process endpoint
          console.error("Error fetching process data:", error);
          newOutput = (
            <p>
              <span className="user">[X]</span> Error fetching image status.
            </p>
          );
        }
      } else {
        newOutput = (
          <p>
            <span className="user">[X]</span> CorId is not available. Please
            upload an image first.
          </p>
        );
      }
    } else if (input === "upload") {
      console.log("Request body:", requestBody);
      if (
        requestBody.imageName === "someName" ||
        requestBody.creatorName === "someCreator" ||
        requestBody.imageTag === "someTag"
      ) {
        newOutput = (
          <p>
            <span className="user">[X]</span> Please set image name, creator
            name, and/or image tag before uploading a file.
          </p>
        );
      } else {
        newOutput = (
          <div
            className={`dropzone ${isDragActive ? "active" : ""}`}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here...</p>
            ) : (
              <p>
                Click here to upload your file(s){" "}
                <span>
                  {" "}
                  <CursorArrowRaysIcon className="h-4 w-4" />{" "}
                </span>{" "}
              </p>
            )}
          </div>
        );
      }
    } else if (input.startsWith("image-name")) {
      // Handle 'image-name' input
      const name = input.replace("image-name", "").trim();
      if (name) {
        // setImageName(name); // Set the state
        setRequestBody((prevRequestBody) => ({
          ...prevRequestBody,
          imageName: name,
        })); // Update state
        console.log("Request body:", requestBody);
        newOutput = (
          <p>
            <span className="user">[✔]</span> Image name has been set to: {name}
          </p>
        );
        // Now you can use the 'imageName' variable in your request body.
      } else {
        newOutput = (
          <p>
            <span className="user">[X]</span> Image name not provided.
          </p>
        );
      }
    } else if (input.startsWith("creator-name")) {
      // Handle 'creator-name' input
      const name = input.replace("creator-name", "").trim();
      if (name) {
        // setCreatorName(name); // Set the state
        setRequestBody((prevRequestBody) => ({
          ...prevRequestBody,
          creatorName: name,
        })); // Update state
        console.log("Request body:", requestBody);
        newOutput = (
          <p>
            <span className="user">[✔]</span> Creator name set to: {name}
          </p>
        );
        // Now you can use the 'creatorName' variable in your request body.
      } else {
        newOutput = (
          <p>
            <span className="user">[!]</span> Creator name not provided.
          </p>
        );
      }
    } else if (input.startsWith("image-tag")) {
      // Handle 'creator-name' input
      const name = input.replace("image-tag", "").trim();
      if (name) {
        // setImageTag(name); // Set the state
        setRequestBody((prevRequestBody) => ({
          ...prevRequestBody,
          imageTag: name,
        })); // Update state
        console.log("Request body:", requestBody);
        newOutput = (
          <p>
            <span className="user">[✔]</span> Image tag set to: {name}
          </p>
        );
        // Now you can use the 'creatorName' variable in your request body.
      } else {
        newOutput = (
          <p>
            <span className="user">[!]</span> Image tag not provided.
          </p>
        );
      }
    } else if (input === "clear") {
      setHistory([]);
      setInput("");
      return;
    } else if (input === "cd") {
      router.push("/creator");
    } else {
      newOutput = (
        <p>
          Command not found. Type "<span className="commands">help</span>" for
          available commands.
        </p>
      );
    }
    setOutput(newOutput);
    setHistory((prevHistory) => [...prevHistory, { input, output: newOutput }]);
    setInput("");
  };

  const renderHistory = () => {
    if (history.length === 0) {
      return null;
    }

    return (
      <div className="history">
        {history.map((item, index) => (
          <div key={index} className="history">
            <span>
              <span className="commands">
                creator
                <span className="symbols">@</span>
                <span className="user">cob.quest:</span>
                <span className="symbols">~$ </span>
              </span>
              <span className="commands">{item.input}</span>
            </span>
            <br />
            <span className="output">{item.output}</span>
            <div className="spacing"></div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="terminal">
      {/* {renderOutput()} */}
      <span className="commands">
        creator
        <span className="symbols">@</span>
        <span className="user">cob.quest:</span>
        <span className="symbols">~$</span>
        <span className="commands"> welcome@creator</span>
      </span>
      <p>
        to create an image, use the commands: <br /> <br />
        <span className="commands">image-name &lt;image-name&gt;</span> to set
        image name <br />
        <span className="commands">image-tag &lt;image-tag&gt;</span> to set
        image tag <br />
        <span className="commands">creator-name &lt;creator-name&gt;</span> to
        set creator name <br />
        <span className="commands">upload</span> to upload an image zip file
        <br />
        <br />
        <span className="commands">status</span> to check the status of image
        creation <br />
        <span className="commands">cd</span> to return to the previous page
      </p>

      {/* <Help /> */}
      {renderHistory()}
      <div className="terminal-spacing">
        <span className="commands">
          creator
          <span className="symbols">@</span>
          <span className="user">cob.quest:</span>
          <span className="symbols">~$ </span>
        </span>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            size={input.length + 1} /* This sets the initial size attribute */
            autoFocus
            className="input-text-custom commands"
          />
        </form>
      </div>
    </div>
  );
};

export default CreateImage;
