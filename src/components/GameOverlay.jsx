import React, { useContext } from "react";
import { AppContext } from "../AppContext";
import GameOverScreen from "./GameOverScreen";
import StartButton from "./StartButton";

export default function GameOverlay({ content }) {
  const { gameStatus } = useContext(AppContext);

  if (gameStatus === "idle") {
    return (
      <div className="overlay">
        <p>Try to find all four animals!</p>
        <StartButton />
      </div>
    );
  } else if (gameStatus === "complete") {
    return <GameOverScreen />;
  }
}
