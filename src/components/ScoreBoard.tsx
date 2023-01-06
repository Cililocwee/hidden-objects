import React, { useContext, useState } from "react";
import { AppContext } from "../AppContext";
import { v4 as uuidv4 } from "uuid";

export default function ScoreBoard() {
  // TODO Better implementation
  const currentContext: any = useContext(AppContext);
  // const { highScores } = useContext(AppContext);
  const { highScores } = currentContext;

  const [lengthFlag, setLengthFlag] = useState(5);

  function handleChangeScoreDisplay(num: number): void {
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
            (person: { id: string; score: number }, index: number) =>
              index < lengthFlag && <li key={uuidv4()}>{person.id}</li>
          )}
        </div>
        <div className="score-scores">
          <h4>Score</h4>
          {highScores?.map(
            (person: { id: string; score: number }, index: number) =>
              index < lengthFlag && (
                <li key={uuidv4()}>
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
