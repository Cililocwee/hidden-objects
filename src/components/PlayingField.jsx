import React from "react";
import "./components.css";
import { useState } from "react";
import PopUpSelection from "./PopUpSelection";
export default function PlayingField({
  sourceImage,
  altDisplay,
  classification,
}) {
  const originalSet = ["bear", "fox", "owl", "rabbit"];

  const [points, setPoints] = useState([]);
  const [animalChoices, setAnimalChoices] = useState([...originalSet]);

  function handlePlaceTarget(e) {
    if (points.length !== 4) {
      const { pageX, pageY } = e;
      setPoints([...points, { x: pageX - 35, y: pageY - 35 }]);

      // ** for debugging click points
      console.log(points);
    }
  }
  function resetTargets() {
    setPoints([]);
    setAnimalChoices(originalSet);
  }

  return (
    <div className="playing-field">
      <button onClick={resetTargets}>Reset</button>
      <div
        className={classification}
        onClick={handlePlaceTarget}
        style={{
          backgroundImage: `url(${sourceImage})`,
          backgroundPosition: "center",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      {points.map((point) => (
        <PopUpSelection
          boxX={point.x}
          boxY={point.y}
          animalArray={animalChoices}
          animalHandler={setAnimalChoices}
        />
      ))}
    </div>
  );
}
