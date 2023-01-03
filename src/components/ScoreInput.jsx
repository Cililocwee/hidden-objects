import React, { useContext, useState } from "react";
import { AppContext } from "../AppContext";

export default function ScoreInput() {
  const { gameDuration, highScores, submitHighScore } = useContext(AppContext);
  const [playerName, setPlayerName] = useState("");
  const [submitStatus, setSubmitStatus] = useState(false);

  function checkScoreList() {
    if (highScores.find((obj) => obj.id === playerName) === undefined) {
      return "not in list";
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (submitStatus === true) {
      alert("You've already submitted your score!");
      return;
    }

    if (checkScoreList() !== "not in list") {
      alert("Name already taken!");
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
  );
}
