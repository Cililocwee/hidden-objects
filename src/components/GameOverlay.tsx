import React, { useContext } from "react";
import { AppContext } from "../AppContext";
import GameOverScreen from "./GameOverScreen";
import StartButton from "./StartButton";
import "./gameOverlay.css";

export default function GameOverlay(): JSX.Element | undefined {
  // TODO Better implementation
  const currentContext: any = useContext(AppContext);
  const { gameStatus } = currentContext;

  if (gameStatus === "idle") {
    return (
      <div className="overlay">
        <div className="overlay-highlight">
          <p className="game-start-blurb">
            Try to find all the animals! <br /> Click each animal and select the
            correct word!
          </p>
          <StartButton />
        </div>
      </div>
    );
  } else if (gameStatus === "complete") {
    return <GameOverScreen />;
  }
}
