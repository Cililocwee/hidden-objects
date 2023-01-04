import React, { useContext } from "react";
import "./components.css";
import { useState } from "react";
import SelectionCard from "./SelectionCard";
import { AppContext } from "../AppContext";
import GameBanner from "./GameBanner";
import animalPic from "../assets/ONLY-IMG-find-10-animals.jpg";

export default function PlayingField({ sourceImage, classification }) {
  const { animalList } = useContext(AppContext);

  const [points, setPoints] = useState([]);
  const [pointsPerc, setPointsPerc] = useState([]);

  function getTargetLocation(e) {
    if (animalList.length === 0) {
      return;
    }

    let rect = e.currentTarget.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    // This is good as a start, it only finds the percentage of the WINDOW
    let xPerc = Math.round((x / e.target.width) * 100);
    let yPerc = Math.round((y / e.target.height) * 100);

    setPoints([{ x: x, y: y, xp: xPerc, yp: yPerc }]);

    console.log([xPerc, yPerc]);
    // console.log(e.target.height);
    // console.log([xPerc, yPerc]);
  }

  return (
    <div className="playing-field">
      <GameBanner />

      {/* TODO Get rid of classification */}
      <div className={classification}>
        <img
          onClick={getTargetLocation}
          src={animalPic}
          alt=""
          className="animal-pic"
        />
      </div>
      {points.map((point) => (
        <SelectionCard
          cardX={point.x}
          cardY={point.y}
          xPerc={point.xp}
          yPerc={point.yp}
          key={crypto.randomUUID()}
        />
      ))}
    </div>
  );
}
