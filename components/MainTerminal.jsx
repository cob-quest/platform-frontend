"use client";
import React, { useState } from "react";
import Intro from "./CobIntro";
import { useRouter } from "next/navigation";

export default function MainTerminal() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [history, setHistory] = useState([]);

  const router = useRouter();

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setOutput("");

    // Process input command
    let newOutput = "";
    if (input === "creator") {
      newOutput = (
        <p>
          <span className="user">[✔]</span> Starting creator mode....
        </p>
      );
      router.push("/creator");
    } else if (input === "participant") {
      newOutput = (
        <p>
          <span className="user">[✔]</span> Starting participant mode....
        </p>
      );
      router.push("/participant");
    } else if (input === "cd") {
      // Check if there is a previous page URL
      if (previousPage) {
        // Navigate back to the previous page
        router.push(previousPage);
        newOutput = (
          <p>
            <span className="user">[✔]</span> Navigating back to the previous
            page...
          </p>
        );
      } else {
        newOutput = (
          <p>
            <span className="user">[✘]</span> There is no previous page to
            navigate to.
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
          Command not found. Users can only "
          <span className="commands">start</span>" .
        </p>
      );
    }
    setOutput(newOutput);
    setHistory((prevHistory) => [...prevHistory, { input, output: newOutput }]);
    setInput("");
  };

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
                user
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
      <Intro />

      {/* {renderOutput()} */}
      {renderHistory()}
      <div className="terminal-spacing">
        <span className="commands">
          user
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
}
