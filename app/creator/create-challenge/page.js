"use client";
import React, { useState } from "react";
import Help from "../../../components/creator/CreatorHelp";
import { useRouter } from "next/navigation";

const CreatorTerminal = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [history, setHistory] = useState([]);

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
    } else if (input === "retrieve image") {
      // list out all images through GET request
    } else if (input === "choose image") {
      // put index number
    } else if (input === "timer") {
      newOutput = (
        <p>
          <span className="user">[✔]</span> Enter the time that you would like
          to allot for this challenge....
        </p>
      );
      // TODO: add input timer logic
    } else if (input === "participants") {
      newOutput = (
        <p>
          <span className="user">[✔]</span> Enter the list of participants
          (seperated by commas)....
        </p>
      );
    } else if (input === "cd") {
      newOutput = (
        <p>
          <span className="user">[✔]</span> ....
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
        3 steps to create a challenge: '
        <span className="commands">retrieve image</span>' -&gt; '
        <span className="commands">timer</span>' -&gt; '
        <span className="commands">participants</span>'
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
