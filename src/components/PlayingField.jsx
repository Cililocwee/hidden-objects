import React, { useContext } from "react";
import "./components.css";
import { useState } from "react";
import SelectionCard from "./SelectionCard";
import { AppContext } from "../AppContext";
import GameBanner from "./GameBanner";

export default function PlayingField({ sourceImage, classification }) {
  const { animalList } = useContext(AppContext);

  // TODO queuedPoint will be queried against the db

  const [points, setPoints] = useState([]);

  // TODO Store these locations +- like 50 to database as the answers
  function getTargetLocation(e) {
    if (animalList.length === 0) {
      return;
    }

    let rect = e.currentTarget.getBoundingClientRect();
    let x = e.clientX - rect.left - 75;
    let y = e.clientY - rect.top - 50;

    setPoints([{ x: x, y: y }]);
  }

  return (
    <div className="playing-field">
      <GameBanner />

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
        <SelectionCard cardX={point.x} cardY={point.y} />
      ))}
    </div>
  );
}
