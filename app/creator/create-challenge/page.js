"use client";
import React, { useState } from "react";
import Help from "../../../components/creator/CreatorHelp";
import axios from "axios";
import { useRouter } from "next/navigation";

const CreatorTerminal = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [history, setHistory] = useState([]);

  const [requestBody, setRequestBody] = useState({
    imageName: "someimage",
    imageTag: "sometag",
    creatorName: "someCreator",
    challengeName: "someChallenge",
    duration: 0,
    participants: [],
  });
  const [corId, setCorId] = useState(""); // State to store corID
  const [imageNames, setImageNames] = useState([]); // State to store image name
  const [images, setImages] = useState([]); // State to store image data including tags

  const router = useRouter();

  const handleInputChange = (e) => {
    setInput(e.target.value);
    e.target.size = e.target.value.length + 1;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setOutput("");

    // Process input command
    let newOutput = "";
    if (input === "help") {
      newOutput = <Help />;
    } else if (input === "ls") {
      try {
        const response = await axios.get(
          "/api/v1/platform/image",
          {
            headers: {
              Authorization: "Basic " + btoa("test:test"), // Replace with your authorization token
            },
          }
        );
        // Iterate through the responseData to display image names
        // Extract image names and set them in the state
        const responseData = response.data;
        const responseStatus = response.status;
        console.log("Response Data:", responseData);
        console.log("Response Status:", responseStatus);

        // const imageNames = responseData.map((image) => image.imageName);
        // setImageNames(imageNames);
        // console.log("Image names:", imageNames);
        // newOutput = (
        //   <div>
        //     {imageNames.map((name, index) => (
        //       <p key={index}>{name}</p>
        //     ))}
        //   </div>
        // );
        const imagesData = responseData.map((image) => ({
          name: image.imageName,
          tag: image.imageTag,
        }));
        setImages(imagesData);
        console.log("Images with tags:", imagesData);
        newOutput = (
          <div>
            {imagesData.map((imageData, index) => (
              <p key={index}>
                {imageData.name} : {imageData.tag}
              </p>
            ))}
          </div>
        );
        // Update state or perform further actions as needed with the responseData.
      } catch (error) {
        console.error("Error fetching images:", error);
        // Handle errors as needed
      }
    } else if (input.startsWith("image-name")) {
      // imageName
      const imageName = input.replace("image-name", "").trim();
      newOutput = (
        <p>
          <span className="user">[✔]</span> {imageName} has been chosen.
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
    } else if (input.startsWith("challenge-name")) {
      const challengeName = input.replace("challenge-name", "").trim();
      newOutput = (
        <p>
          <span className="user">[✔]</span> Challenge name set to{" "}
          {challengeName}.
        </p>
      );
      setRequestBody((prevRequestBody) => ({
        ...prevRequestBody,
        challengeName,
      })); // Update state
      console.log("Request body:", requestBody);
    } else if (input.startsWith("image-tag")) {
      const imageTag = input.replace("image-tag", "").trim();
      newOutput = (
        <p>
          <span className="user">[✔]</span> Image tag set to {imageTag}.
        </p>
      );
      setRequestBody((prevRequestBody) => ({
        ...prevRequestBody,
        imageTag,
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
          <span className="user">[✔]</span> Participants set to{" "}
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
      const endpoint = "/api/v1/platform/challenge";

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
          console.log("Challenge is being created:", response.data);
          newOutput = (
            <p className="input-text-custom commands">
              <span className="user">[✔]</span> Challenge is being created!
            </p>
          );
          // Store the corId in the state
          setCorId(response.data.corId);
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
    } else if (input.startsWith("status")) {
      // Check if corId is not empty
      if (corId) {
        // Make a GET request to process the challenge with the stored corId
        try {
          const response = await axios.get(
            `/api/v1/platform/process/${corId}`
          );
          // .then((response) => {
          //   const eventStatus = response.data.eventStatus;
          //   console.log("Challenge status:", eventStatus);
          //   newOutput = (
          //     <p className="input-text-custom commands">
          //       <span className="user">[✔]</span> Challenge status:{" "}
          //       {eventStatus}
          //     </p>
          //   );
          //   setOutput(newOutput);
          // })
          // .catch((error) => {
          //   console.error("Error processing challenge: " + error);
          //   newOutput = <p>Error processing challenge.</p>;
          //   setOutput(newOutput);
          // });
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
            <span className="user">[✖]</span> corId is empty. Create a challenge
            first.
          </p>
        );
      }
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
        to create a challenge, use the commands:
      </p>
      <p>
        <span className="commands">challenge-name &lt;challenge-name&gt;</span> to set challenge name  <br />
        <span className="commands">image-name &lt;image-name&gt;</span> to set image name  <br />
        <span className="commands">image-tag &lt;image-tag&gt;</span> to set image tag  <br />
        <span className="commands">creator-name &lt;creator-name&gt;</span> to set creator name <br />
        <span className="commands">timer &lt;timer&gt;</span> to set timer in minutes  <br />
        <span className="commands">participants [ participants ... ]</span> to set participants   <br />
        <br />
        <span className="commands">ls</span> to view your available images  <br />
        <span className="commands">create-challenge</span> to create a challenge with the values set<br />
        <span className="commands">status</span> to then check the status of challenge creation
      </p>
      <br />

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
    </div >
  );
};

export default CreatorTerminal;
