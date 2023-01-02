import React, { useContext, useState } from "react";
import { AppContext } from "../AppContext";

export default function GameOverScreen() {
  const { gameDuration, highScores, submitHighScore } = useContext(AppContext);
  const [playerName, setPlayerName] = useState("");
  const [submitStatus, setSubmitStatus] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (submitStatus === true) {
      alert("You've already submitted your score!");
      return;
    }
    if (playerName === "") {
      alert("You need a name!");
      return;
    }
    submitHighScore(playerName, gameDuration);
    setSubmitStatus(true);
  }

  return (
    <div className="overlay">
      <p>
        Congratulations! You completed the game in&nbsp;
        {Math.round(gameDuration / 10) / 100} seconds!
      </p>
      <div className="score-input">
        <form onSubmit={handleSubmit}>
          <label htmlFor="identification">Enter your name: </label>
          <input
            name="identification"
            type="text"
            onChange={(e) => setPlayerName(e.target.value)}
          ></input>
          <button type="submit">Submit score</button>
        </form>
      </div>
      <div className="high-scores" id="high-scores">
        <h3>High Scores:</h3>
        <div className="score-box">
          <div className="score-names">
            <h4>Name</h4>
            {highScores?.map(
              (person, index) => index < 5 && <li>{person.id}</li>
            )}
            ...
          </div>
          <div className="score-scores">
            <h4>Score</h4>
            {highScores?.map(
              (person, index) =>
                index < 5 && <li>{Math.round(person.score / 10) / 100} secs</li>
            )}
            ...
          </div>
        </div>
        <ol></ol>
      </div>
    </div>
  );
}
