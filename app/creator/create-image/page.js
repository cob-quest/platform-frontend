"use client";
import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { CursorArrowRaysIcon } from "@heroicons/react/24/solid";
import axios from "axios";

const CreateImage = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [history, setHistory] = useState([]);
  const [imageData, setImageData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadedFileNames, setUploadedFileNames] = useState([]); // State to store uploaded file names
  const [imageName, setImageName] = useState(""); // State for imageName
  const [creatorName, setCreatorName] = useState(""); // State for creatorName

  // Fetch image data from your API when the component mounts
  useEffect(() => {
    if (input === "image status") {
      setLoading(true);
      // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint for listing images
      fetch("http://localhost:80/api/v1/platform/image")
        .then((response) => response.json())
        .then((data) => {
          setImageData(data);
          setLoading(false);
          console.log("Image data:", data);
        })
        .catch((error) => {
          console.error("Error fetching image data: " + error);
          setLoading(false);
        });
    }
  }, [input]);

  const onDrop = async (acceptedFiles) => {
    const formData = new FormData();
    formData.append("imageFile", acceptedFiles[0]);
    formData.append("imageName", imageName); // Use the state value
    formData.append("creatorName", creatorName); // Use the state value

    // Log the content of the formData
    console.log("Form Data Contents:");
    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      const response = await axios.post(
        "http://localhost:80/api/v1/trigger/image",
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

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setOutput("");

    // Process input command
    let newOutput = "";
    if (input === "help") {
      newOutput = <Help />;
    } else if (input === "image status") {
      // list out all images through GET request from YL
      newOutput = (
        <div>
          <p>
            <span className="user">[✔]</span> Listing image status...
          </p>
          {loading ? (
            <p>Loading image data...</p>
          ) : (
            <ImageTable data={imageData} />
          )}
        </div>
      );
    } else if (input === "upload image") {
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
              <p className="text-white">
                {uploadedFileNames.map((fileName, index) => (
                  <p key={index}>{fileName}</p>
                ))}
              </p>
            </div>
          )}
        </div>
      );
    } else if (input.startsWith("image-name")) {
      // Handle 'image-name' input
      const name = input.replace("image-name", "").trim();
      if (name) {
        setImageName(name); // Set the state
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
        setCreatorName(name); // Set the state
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
    } else if (input === "clear") {
      setHistory([]);
      setInput("");
      return;
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

  const ImageTable = ({ data }) => {
    if (!data) {
      return (
        <p>
          <span className="user">[X]</span> No images to list...
        </p>
      );
    }

    return (
      <table className="text-white">
        <thead>
          <tr>
            <th className="table-cell-header">Image Name</th>
            <th className="table-cell-header">Creator Name</th>
            <th className="table-cell-header">Image Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((image, index) => (
            <tr key={index}>
              <td className="table-cell">{image.image_name}</td>
              <td className="table-cell">{image.creator_name}</td>
              <td className="table-cell">{image.image_status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  // Asynchronous function to get user input

  // const renderOutput = () => {
  //     if (output === '') {
  //         return null;
  //     }

  //     return (
  //         <pre className="output">
  //             <code>{output}</code>
  //         </pre>
  //     );
  // };

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
                <span className="user">cob.dev:</span>
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
        <span className="user">cob.dev:</span>
        <span className="symbols">~$</span>
        <span className="commands"> welcome@creator</span>
      </span>
      <p>
        {" "}
        state your '<span className="commands">image-name</span>' and '
        <span className="commands">creator-name</span>' and and select file to '
        <span className="commands">upload image</span>' then check the status of
        your image using '<span className="commands">image status</span>'
      </p>

      {/* <Help /> */}
      {renderHistory()}
      <div className="terminal-spacing">
        <span className="commands">
          creator
          <span className="symbols">@</span>
          <span className="user">cob.dev:</span>
          <span className="symbols">~$ </span>
        </span>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            autoFocus
            className="input-text-custom commands"
          />
        </form>
      </div>
    </div>
  );
};

export default CreateImage;
