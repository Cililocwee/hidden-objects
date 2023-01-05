import React, { useContext, useState } from "react";
import { AppContext } from "../AppContext";

export default function ScoreBoard() {
  const { highScores } = useContext(AppContext);
  const [lengthFlag, setLengthFlag] = useState(5);

  function handleChangeScoreDisplay(num) {
    setLengthFlag(num);
  }

  return (
    <div className="high-scores" id="high-scores">
      <div className="score-btn-div">
        <button onClick={() => handleChangeScoreDisplay(5)}>Top 5</button>
        <button onClick={() => handleChangeScoreDisplay(10)}>Top 10</button>
      </div>
      <h3>High Scores:</h3>
      <div className="score-box">
        <div className="score-names">
          <h4>Name</h4>
          {highScores?.map(
            (person, index) =>
              index < lengthFlag && (
                <li key={crypto.randomUUID()}>{person.id}</li>
              )
          )}
        </div>
        <div className="score-scores">
          <h4>Score</h4>
          {highScores?.map(
            (person, index) =>
              index < lengthFlag && (
                <li key={crypto.randomUUID()}>
                  {Math.round(person.score / 10) / 100} secs
                </li>
              )
          )}
        </div>
      </div>
      <button onClick={() => setLengthFlag(highScores.length)}>All</button>
    </div>
  );
}
