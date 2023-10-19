// import React from "react";

// export default function CreateChallenge() {
//   return (
//     <main>
//       <div>
//         <h2 className="underline">
//           <i>Retrieve image by typing the name of the image </i>
//         </h2>
//       </div>
//       <div>
//         <h2 className="underline">
//           <i>Enter time allocated for challenge</i>
//         </h2>
//         <p> Time format HH:MM </p>
//       </div>
//       <div>
//         <h2 className="underline">
//           <i>Enter the Email IDs of the Challenge Participants</i>
//         </h2>
//       </div>
//     </main>
//   );
// }

// // drag drop (zip file)
// // mailing list (but idk the format yet)
// // set time (but idk the format yet)

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
      // name of image
      let isDone = false;
      newOutput = (
        <p>
          <span className="user">[✔]</span> Enter the image you would like to
          retrieve using the correlation ID.... when you are done, type "
          <span className="commands">done</span>".
        </p>
      );
      // Continuously prompt for input until the user enters "done"
      while (!isDone) {
        // Use the "await" keyword to asynchronously wait for input
        const inputResult = await getUserInput();

        if (inputResult === "done") {
          isDone = true;
        } else {
          // Handle the input, e.g., store it or perform actions
          // You can add logic to process each entered value here
        }
      }
      // TODO: add image retrieval logic
        // image does not exist
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
        <span className="commands">retrieve image</span>' -&gt;{" "}
        '<span className="commands">timer</span>' -&gt;{" "}
        '<span className="commands">participants</span>'
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
