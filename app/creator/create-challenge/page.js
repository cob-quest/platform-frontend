"use client";
import React, { useState } from "react";
import Help from "../../../components/creator/CreatorHelp";
import { useRouter } from "next/navigation";
import axios from "axios";

const CreatorTerminal = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [history, setHistory] = useState([]);
  const [requestBody, setRequestBody] = useState({
    imageName: "someimage",
    creatorName: "someCreator",
    duration: 0,
    participants: [],
  });

  const router = useRouter();

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
    } else if (input.startsWith("retrieve-image")) {
      // list out all images through GET request
      try {
        const response = await axios.get(
          "http://localhost:80/api/v1/platform/image",
          {
            headers: {
              Authorization: "Basic " + btoa("test:test"), // Replace with your authorization token
            },
          }
        );
        // Iterate through the responseData to display image names
        const imageNames = responseData.map((image) => image.imageName);

        const imagesOutput = (
            <p>
              {imageNames.map((name, index) => (
                <p key={index}>{name}</p>
              ))}
            </p>
        );
         newOutput = imagesOutput;

        const responseData = response.data;
        const responseStatus = response.status;
        // Handle the response data here, for example, you can set it in the state and display it.
        console.log("Response Data:", responseData);
        console.log("Response Status:", responseStatus);
        // Update state or perform further actions as needed with the responseData.
      } catch (error) {
        console.error("Error fetching images:", error);
        // Handle errors as needed
      }
    } else if (input.startsWith("choose-image")) {
      // imageName
      const imageName = input.replace("choose-image", "").trim();
      newOutput = (
        <p>
          <span className="user">[✔]</span> Image name set to {imageName}.
        </p>
      );
      setRequestBody((prevRequestBody) => ({ ...prevRequestBody, imageName })); // Update state
      console.log("Request body:", requestBody);
    } else if (input.startsWith("creator-name")) {
      const creatorName = input.replace("creator-name", "").trim();
      newOutput = (
        <p>
          <span className="user">[✔]</span> Creator name set to {creatorName}.
        </p>
      );
      setRequestBody((prevRequestBody) => ({
        ...prevRequestBody,
        creatorName,
      })); // Update state
      console.log("Request body:", requestBody);
    } else if (input.startsWith("timer")) {
      const duration = parseInt(input.replace("timer", "").trim(), 10);
      if (!isNaN(duration)) {
        newOutput = (
          <p>
            <span className="user">[✔]</span> Duration set to {duration}{" "}
            minutes.
          </p>
        );
        setRequestBody((prevRequestBody) => ({ ...prevRequestBody, duration })); // Update state
        console.log("Request body:", requestBody);
        // TODO: add input timer logic
      } else {
        newOutput = (
          <p>
            <span className="user">[✖]</span> Invalid duration format. Please
            use "timer [minutes]" format.
          </p>
        );
      }
    } else if (input.startsWith("participants")) {
      const participantsInput = input.replace("participants", "").trim();
      const participantsArray = participantsInput
        .split(",")
        .map((participant) => participant.trim());
      newOutput = (
        <p>
          <span className="user">[✔]</span> Participants set:{" "}
          {participantsArray.join(", ")}.
        </p>
      );
      setRequestBody((prevRequestBody) => ({
        ...prevRequestBody,
        participants: participantsArray,
      })); // Update state
      console.log("Request body:", requestBody);
    } else if (input === "create-challenge") {
      newOutput = (
        <p>
          <span className="user">[✔]</span> Challenge is getting created....
        </p>
      );
      // Make a POST request to create a challenge
      const endpoint = "http://localhost:80/api/v1/trigger/challenge";

      console.log("Request body:", requestBody);
      // Axios POST request with headers
      axios
        .post(endpoint, requestBody, {
          headers: {
            Authorization: "Basic " + btoa("test:test"), // Replace with your Basic Auth token
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("Challenge created:", response.data);
          newOutput = (
            <p className="input-text-custom commands">
              <span className="user">[✔]</span> Challenge has been succesfully
              created!
            </p>
          );
          setOutput(newOutput);
        })
        .catch((error) => {
          console.error("Error creating challenge: " + error);
          newOutput = <p>Error creating challenge.</p>;
          setOutput(newOutput);
        });
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
        4 steps to create a challenge: '
        <span className="commands">retrieve-image</span>' -&gt; '
        <span className="commands">choose-image</span>' -&gt; '
        <span className="commands">creator-name</span>' -&gt; '
        <span className="commands">timer</span>' -&gt; '
        <span className="commands">participants</span>' -&gt; '
        <span className="commands">create-challenge</span>'
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

export default CreatorTerminal;
