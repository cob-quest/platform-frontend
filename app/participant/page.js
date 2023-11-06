// import ParticipantTerminal from "@/components/participant/ParticipantTerminal";

// export default function Home() {
//   return (

//     <ParticipantTerminal/>
//   );
// }

"use client";
import React, { useState } from "react";
// import Help from "../../../components/participant/CreatorHelp";
import axios from "axios";
import { useRouter } from "next/navigation";

const ParticipantTerminal = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [history, setHistory] = useState([]);
  const [imageNames, setImageNames] = useState([]); // State to store image names

  const [token, setToken] = useState(""); // State to store token
  const [corId, setCorId] = useState(""); // State to store corId
  const [sshKey, setSshKey] = useState(""); // State to store SSH Key
  const [port, setPort] = useState(""); // State to store Port
  const [ipAddress, setIpAddress] = useState(""); // State to store IP Address
  const [eventStatus, setEventStatus] = useState(""); // State to store Event Status

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
    if (input.startsWith("token")) {
      try {
        // Extract the token from the input
        const token = input.replace("token", "").trim();
        setToken(token); // Store the token
        console.log("Token:", token);
        const requestBody = {
          token: token,
        };

        const response = await axios.post(
          "http://34.41.93.186/api/v1/platform/attempt",
          requestBody, // Pass the requestBody here
          {
            headers: {
              Authorization: "Basic " + btoa("test:test"), // Replace with your authorization token
            },
          }
        );
        // Iterate through the responseData to display image names
        // Extract image names and set them in the state
        const responseData = response.data;
        console.log("Challenge is being created:", response.data);
        newOutput = (
          <p>
            <span className="user">[✔]</span> Token is valid! Challenge has been
            retrieved
          </p>
        );
        // Store the corId in the state
        setCorId(response.data.corId);
      } catch (error) {
        console.error("Error fetching challenge associated with token:", error);
        // Handle errors as needed
      }
    } else if (input === "status") {
      try {
        // endpoint is const statusEndpoint = `http://34.41.93.186:80/api/v1/platform/challenge/status/${corId}`
        if (corId) {
          const response = await axios.get(
            `http://34.41.93.186/api/v1/platform/challenge/status/${corId}`,
            {
              headers: {
                Authorization: "Basic " + btoa("test:test"), // Replace with your authorization token
              },
            }
          );
          const eventStatus = response.data.eventStatus;
          console.log("Challenge status:", eventStatus);
          newOutput = (
            <p className="input-text-custom commands">
              <span className="user">[✔]</span> Challenge status: {eventStatus}
            </p>
          );
        }
      } catch (error) {
        console.error("Error fetching status associated with corId:", error);
        // Handle errors as needed
      }
    } else if (input === "start") {
      try {
        // endpoint is const statusEndpoint = `http://34.41.93.186:80/api/v1/platform/challenge/status/${corId}`

        const response = await axios.get(
          `http://34.41.93.186/api/v1/platform/attempt/${token}`,
          {
            headers: {
              Authorization: "Basic " + btoa("test:test"), // Replace with your authorization token
            },
          }
        );
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
      } catch (error) {
        console.error("Error fetching challenge", error);
        // Handle errors as needed
      }
    } else if (input === "cd") {
      router.push("/");
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
        enter your challenge token using '
        <span className="commands">token</span>'! then check the status of your
        challenge using '<span className="commands">status</span>' and start
        your challenge using '<span className="commands">start</span>'
      </p>
      <p> cob wishes you all the best! </p>

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
            size={input.length + 1} /* This sets the initial size attribute */
            autoFocus
            className="input-text-custom commands"
          />
        </form>
      </div>
    </div>
  );
};

export default ParticipantTerminal;
