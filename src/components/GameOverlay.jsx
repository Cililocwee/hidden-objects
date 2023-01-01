import React, { useContext } from "react";
import { AppContext } from "../AppContext";
import StartButton from "./StartButton";

export default function GameOverlay({ content }) {
  const { gameStatus, gameDuration } = useContext(AppContext);
  if (gameStatus === "idle") {
    return (
      <div class="overlay">
        <p>Try to find all four animals!</p>
        <StartButton />
      </div>
    );
  } else if (gameStatus === "complete") {
    return (
      <div class="overlay">
        <p>
          Congratulations! You completed the game in{" "}
          {Math.round(gameDuration / 10) / 100} seconds!
        </p>
      </div>
    );
  }
}
