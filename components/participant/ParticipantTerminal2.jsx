"use client";
import React, { useState } from "react";
import axios from "axios";

const ParticipantTerminal = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [history, setHistory] = useState([]);
  const [token, setToken] = useState(""); // State to store token
  const [corId, setCorId] = useState(""); // State to store corId
  const [sshKey, setSshKey] = useState(""); // State to store SSH Key
  const [port, setPort] = useState(""); // State to store Port
  const [ipAddress, setIpAddress] = useState(""); // State to store IP Address
  const [eventStatus, setEventStatus] = useState(""); // State to store Event Status

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setOutput("");

    // Process input command
    let newOutput = "";
    if (input === "help") {
      newOutput = <Help />;
    } else if (input.startsWith("token")) {
      // Extract the token from the input
      const token = input.replace("token", "").trim();
      setToken(token); // Store the token

      // Make a POST request to create a challenge with the stored token
      // const endpoint = "/api/v1/platform/attempt";
      const endpoint = ":80/api/v1/platform/attempt";
      const requestBody = {
        token: token,
      };

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
            <p>
              <span className="user">[✔]</span> Token is valid! Challenge has
              been retrieved
            </p>
          );
          // Store the corId in the state
          setCorId(response.data.corId);
        })
        .catch((error) => {
          console.error("Error creating challenge: " + error);
          newOutput = <p>Error creating challenge.</p>;
        });
    } else if (input.startsWith("status")) {
      // Check if corId is not empty
      if (corId) {
        // Make a GET request to get the challenge status with the stored corId
        const statusEndpoint = `:80/api/v1/platform/challenge/status/${corId}`;
        axios
          .get(statusEndpoint, {
            headers: {
              Authorization: "Basic " + btoa("test:test"), // Replace with your Basic Auth token
            },
          })
          .then((response) => {
            const eventStatus = response.data.eventStatus;
            setEventStatus(eventStatus); // Store the eventStatus
            console.log("Challenge status is:", eventStatus);
            newOutput = (
              <p className="input-text-custom commands">
                <span className="user">[✔]</span> Challenge status is{" "}
                {eventStatus}
              </p>
            );
            setOutput(newOutput);
          })
          .catch((error) => {
            console.error("Error checking challenge status: " + error);
            newOutput = <p>Error checking challenge status.</p>;
            setOutput(newOutput);
          });
      } else {
        newOutput = (
          <p>
            <span className="user">[✖]</span> corId is empty. Create a challenge
            first.
          </p>
        );
      }
    } else if (input.startsWith("start")) {
      // if (eventStatus === "challengeStarted") {

      // Make a GET request to get SSH Key, Port, and IP Address with the stored token
      const startEndpoint = `:80/api/v1/platform/attempt/${token}`;

      axios
        .get(startEndpoint, {
          headers: {
            Authorization: "Basic " + btoa("test:test"), // Replace with your Basic Auth token
          },
        })
        .then((response) => {
          const sshKeyResponse = response.data.sshkey;
          const portResponse = response.data.port;
          const ipAddressResponse = response.data.ipaddress;
          setSshKey(sshKeyResponse);
          setPort(portResponse);
          setIpAddress(ipAddressResponse);
          console.log("SSH Key:", sshKeyResponse);
          console.log("Port:", portResponse);
          console.log("IP Address:", ipAddressResponse);
          newOutput = (
            <div>
              <p>
                {" "}
                Challenge is retrieved and here are your details! All the best!{" "}
              </p>
              <p className="input-text-custom commands">
                <span className="user">[✔]</span> SSH Key: {sshKey}
              </p>
              <p className="input-text-custom commands">
                <span className="user">[✔]</span> Port: {port}
              </p>
              <p className="input-text-custom commands">
                <span className="user">[✔]</span> IP Address: {ipAddress}
              </p>
            </div>
          );
        })
        .catch((error) => {
          console.error(
            "Error fetching SSH Key, Port, and IP Address: " + error
          );
          newOutput = <p>Error fetching SSH Key, Port, and IP Address.</p>;
        });
      // } else {
      //   newOutput = (
      //     <p>
      //       <span className="user">[✖]</span> Challenge has not started yet.
      //     </p>
      //   );
      // }
    } else if (input === "clear") {
      setHistory([]);
      setInput("");
      return;
    } else {
      newOutput = (
        <p>
          Command not found. Users can only "
          <span className="commands">start</span>" .
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
                participant
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

  const asciiArt = `
    ,o888888o.        ,o888888o.     8 888888888o
   8888     '88.   . 8888     '88.   8 8888    '88.
  ,8 8888       '8. ,8 8888       '8b  8 8888     '88
 88 8888           88 8888        '8b 8 8888     ,88
 88 8888           88 8888         88 8 8888.   ,88'
 88 8888           88 8888         88 8 8888888888
 88 8888           88 8888        ,8P 8 8888    '88.
 '8 8888       .8' '8 8888       ,8P  8 8888      88
   8888     ,88'   ' 8888     ,88'   8 8888    ,88'
    '8888888P'        '8888888P'     8 888888888P
  `;

  return (
    <div className="terminal">
      {/* <Intro /> */}

      {/* {renderOutput()} */}

      <div className="terminal-spacing">
        <span className="commands">
          participant
          <span className="symbols">@</span>
          <span className="user">cob.quest:</span>
          <span className="symbols">~$</span>
          <span className="commands"> welcome@participant</span>
        </span>
        <pre className="ascii-art">{asciiArt}</pre>
        <p> </p>
        <p>
          {" "}
          enter '<span className="commands">token</span>' to get your challenge.
        </p>
        <p>
          {" "}
          check '<span className="commands">status</span>' of your challenge.
        </p>
        <p>
          {" "}
          '<span className="commands">start</span>' to begin your challenge. you
          will be provided a ssh key, port number and ip address upon starting
          the challenge. all the best!
        </p>

        {renderHistory()}

        <span className="commands">
          participant
          <span className="symbols">@</span>
          <span className="user">cob.quest:</span>
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

export default ParticipantTerminal;
