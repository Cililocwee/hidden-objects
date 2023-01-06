import React, { useContext, useState } from "react";
import { AppContext } from "../AppContext";

export default function ScoreInput(): JSX.Element {
  // TODO Better implementation
  const currentContext: any = useContext(AppContext);
  const { gameDuration, highScores, submitHighScore } = currentContext;
  const [playerName, setPlayerName] = useState("");
  const [submitStatus, setSubmitStatus] = useState(false);

  function checkScoreList(): undefined | string {
    if (
      highScores.find(
        (obj: { id: string; score: number }) => obj.id === playerName
      ) === undefined
    ) {
      return "not in list";
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
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
