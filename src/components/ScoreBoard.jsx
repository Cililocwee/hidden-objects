import React, { useContext } from "react";
import { AppContext } from "../AppContext";

export default function ScoreBoard() {
  const { highScores } = useContext(AppContext);
  return (
    <div className="high-scores" id="high-scores">
      <h3>High Scores:</h3>
      <div className="score-box">
        <div className="score-names">
          <h4>Name</h4>
          {highScores?.map(
            (person, index) =>
              index < 5 && <li key={crypto.randomUUID()}>{person.id}</li>
          )}
          ...
        </div>
        <div className="score-scores">
          <h4>Score</h4>
          {highScores?.map(
            (person, index) =>
              index < 5 && (
                <li key={crypto.randomUUID()}>
                  {Math.round(person.score / 10) / 100} secs
                </li>
              )
          )}
          ...
        </div>
      </div>
    </div>
  );
}
