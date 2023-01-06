import React, { useContext } from "react";
import { AppContext } from "../AppContext";

export default function StartButton(): JSX.Element {
  // TODO Better implementation
  const currentContext: any = useContext(AppContext);
  const { startGame, fetchHighScores } = currentContext;

  function handleClick(): void {
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
