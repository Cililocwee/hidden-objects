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
    let x = e.clientX - rect.left - 75;
    let y = e.clientY - rect.top - 110;

    // This is good as a start, it only finds the percentage of the WINDOW
    let xPerc = Math.round((e.clientX / e.target.width) * 100);
    // TODO Get rid of magic number 268
    let yPerc = Math.round(((e.clientY - 268) / e.target.height) * 100);

    setPoints([{ x: x, y: y, xp: xPerc, yp: yPerc }]);

    // console.log(e.clientY);
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
