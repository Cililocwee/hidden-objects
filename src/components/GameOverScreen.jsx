import React, { useContext } from "react";
import { AppContext } from "../AppContext";
import ScoreBoard from "./ScoreBoard";
import ScoreInput from "./ScoreInput";

export default function GameOverScreen() {
  const { gameDuration } = useContext(AppContext);

  return (
    <div className="overlay">
      <div className="gameover-highlight">
        <h3>Congratulations!</h3>
        <p className="game-over-blurb">
          You completed the game in&nbsp;
          {Math.round(gameDuration / 10) / 100} seconds!
        </p>
      </div>
      <ScoreInput />
      <ScoreBoard />
    </div>
  );
}
