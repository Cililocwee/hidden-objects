import React, { useContext } from "react";
import { AppContext } from "../AppContext";
import StartButton from "./StartButton";

export default function GameOverlay({ content }) {
  const { gameStatus, gameDuration, fetchHighScores, highScores } =
    useContext(AppContext);
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
        <div>
          <label htmlFor="identification">Enter your name: </label>
          <input name="identification" type="text"></input>
        </div>
        <div className="high-scores" id="high-scores">
          <h3>High Scores:</h3>
          <div className="score-box">
            <div className="score-names">
              <h4>Name</h4>
              {highScores?.map((person) => (
                <li>{person.id}</li>
              ))}
            </div>
            <div className="score-scores">
              <h4>Score</h4>
              {highScores?.map((person) => (
                <li>{Math.round(person.score / 10) / 100} secs</li>
              ))}
            </div>
          </div>
          <ol></ol>
        </div>
      </div>
    );
  }
}
