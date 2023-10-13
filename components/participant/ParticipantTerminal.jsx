"use client";
import React, { useState } from "react";


const ParticipantTerminal = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [history, setHistory] = useState([]);

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
      // } else if (input === 'about') {
      //     newOutput = <About />;
      // } else if (input === 'skills') {
      //     newOutput = <Skills />;
      // } else if (input === 'socials') {
      //     newOutput = <Socials />;
      // } else if (input === 'projects') {
      //     newOutput = <Projects />;
    } else if (input === "start") {
      newOutput = (
        <p>
          <p>
            <span className="user">[✔]</span> Starting challenge and timer....
          </p>
          <p> </p>
          <p> ssh key: njekwe </p>
          <p> secret key: dwjeol </p>
          <p> timer: </p>
        </p>
      );
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
                participant
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
          <span className="user">cob.dev:</span>
          <span className="symbols">~$</span>
          <span className="commands"> welcome@participant</span>
        </span>
        <pre className="ascii-art">{asciiArt}</pre>
        <p> </p>
        <p> welcome to cob </p>
        <p>cob is a ... </p>
        <p> challenge title </p>
        <p> challenge instructions </p>
        <p> challenge time allotted </p>
        <p>
          {" "}
          type "<span className="commands">start</span>" to begin your
          challenge. you will be provided a ssh key and secret key upon starting
          the challenge.
        </p>

        {renderHistory()}

        <span className="commands">
          participant
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

export default ParticipantTerminal;
