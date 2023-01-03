import React, { useContext } from "react";
import { AppContext } from "../AppContext";
import GameOverScreen from "./GameOverScreen";
import StartButton from "./StartButton";
import "./gameOverlay.css";

export default function GameOverlay({ content }) {
  const { gameStatus } = useContext(AppContext);

  if (gameStatus === "idle") {
    return (
      <div className="overlay">
        <div className="overlay-highlight">
          <p>Try to find all four animals!</p>
          <StartButton />
        </div>
      </div>
    );
  } else if (gameStatus === "complete") {
    return <GameOverScreen />;
  }
}
