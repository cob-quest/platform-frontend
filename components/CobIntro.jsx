import React from "react";

const Intro = () => {
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
    <>
      <span className="commands">
        user
        <span className="symbols">@</span>
        <span className="user">cob.quest:</span>
        <span className="symbols">~$</span>
        <span className="commands"> welcome@user</span>
      </span>
      <pre className="ascii-art">{asciiArt}</pre>
      <p> </p>
      <p>
        {" "}
        would you like to start as a '<span className="commands">creator</span>' or '
        <span className="commands">participant</span>'?
      </p>
    </>
  );
};

export default Intro;
