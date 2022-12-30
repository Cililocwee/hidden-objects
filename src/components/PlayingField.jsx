import React, { useContext } from "react";
import "./components.css";
import { useState } from "react";
import SelectionCard from "./SelectionCard";
import { AppContext } from "../AppContext";
export default function PlayingField({ sourceImage, classification }) {
  const { animalList, resetAnimalList, fetchAnswers } = useContext(AppContext);

  // TODO queuedPoint will be queried against the db
  const [queuedPoint, setQueuedPoint] = useState([]);
  const [points, setPoints] = useState([]);

  // TODO Store these locations +- like 50 to database as the answers
  function getTargetLocation(e) {
    if (animalList.length === 0) {
      return;
    }
    let rect = e.currentTarget.getBoundingClientRect();
    let x = e.clientX - rect.left - 75;
    let y = e.clientY - rect.top - 50;

    setPoints([...points, { x: x, y: y }]);
    setQueuedPoint([x, y]);
    console.log(queuedPoint);
  }

  function resetTargets() {
    setPoints([]);
    resetAnimalList();
  }

  function removePoints(arr) {
    let newPoints = points.filter(
      (obj) => obj.x !== arr[0] && obj.y !== arr[1]
    );
    setPoints(newPoints);
  }

  return (
    <div className="playing-field">
      <button onClick={resetTargets}>Reset</button>
      <div
        className={classification}
        onClick={getTargetLocation}
        style={{
          backgroundImage: `url(${sourceImage})`,
          backgroundPosition: "center",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      {points.map((point) => (
        <SelectionCard
          cardX={point.x}
          cardY={point.y}
          escapeHatch={removePoints}
        />
      ))}
      <button onClick={() => fetchAnswers()}>Answers</button>
    </div>
  );
}
