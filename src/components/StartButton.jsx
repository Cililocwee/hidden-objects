import React, { useContext } from "react";
import { AppContext } from "../AppContext";

export default function StartButton() {
  const { startGame, fetchHighScores } = useContext(AppContext);

  // TODO Not working

  function handleClick() {
    startGame();
    fetchHighScores();
  }

  return (
    <div>
      <button onClick={() => handleClick()} id="start-btn">
        Start!
      </button>
    </div>
  );
}
