"use client";
import React, { useState } from "react";
import Help from "./CreatorHelp";
import { useRouter } from "next/navigation";
import axios from "axios";

const ParticipantTerminal = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [history, setHistory] = useState([]);
  const [challengeNames, setChallengeNames] = useState([]);
  const [token, setToken] = useState(""); // State to store token
  const [corId, setCorId] = useState(""); // State to store corId
  const [sshKey, setSshKey] = useState(""); // State to store SSH Key
  const [port, setPort] = useState(""); // State to store Port
  const [ipAddress, setIpAddress] = useState(""); // State to store IP Address
  const [eventStatus, setEventStatus] = useState(""); // State to store Event Status

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
    } else if (input.startsWith("token")) {
      newOutput = (
        <p>
          <span className="user">[✔]</span> Opening challenge creation....
        </p>
      );
      const newTab = window.open("/creator/create-challenge", "_blank");
      newTab.focus();
    } else if (input === "create image") {
      newOutput = (
        <p>
          <span className="user">[✔]</span> Opening image creation....
        </p>
      );
      const newTab = window.open("/creator/create-image", "_blank");
      newTab.focus();
    } else if (input === "cd") {
      newOutput = (
        <p>
          <span className="user">[✔]</span> Starting participant mode....
        </p>
      );
      router.push("/");
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
      <p> welcome to cob </p>
      <p>
        {" "}
        would you like to '<span className="commands">create image</span>' or '
        <span className="commands">create challenge</span>' or '
        <span className="commands">manage challenge</span>' or '
        <span className="commands">ls challenges</span>'?
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
            autoFocus
            className="input-text-custom commands"
          />
        </form>
      </div>
    </div>
  );
};

export default ParticipantTerminal;
