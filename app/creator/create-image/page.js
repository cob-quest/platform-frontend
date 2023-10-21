"use client";
import React, { useState, useEffect } from "react";
import FileUpload from "@/components/file-upload/FileUpload";

const CreateImage = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [history, setHistory] = useState([]);
  const [imageData, setImageData] = useState([]);
  const [loading, setLoading] = useState(false);

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
    } else if (input === "upload image") {
      newOutput = <FileUpload />;
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
        to upload your image '<span className="commands">upload image</span>'
        then check the status of your image using '
        <span className="commands">image status</span>'
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
