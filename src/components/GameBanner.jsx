import React, { useContext } from "react";
import { AppContext } from "../AppContext";
import StartButton from "./StartButton";

export default function GameBanner() {
  const { animalList, zoo } = useContext(AppContext);
  return (
    <div className="game-banner">
      <ul>
        {animalList?.map((animal) => (
          <li>{animal}</li>
        ))}
        {zoo?.map((animal) => (
          <li style={{ textDecoration: "line-through" }}>{animal}</li>
        ))}
      </ul>{" "}
      {/* <StartButton /> */}
    </div>
  );
}
