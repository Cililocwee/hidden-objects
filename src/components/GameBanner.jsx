import React, { useContext } from "react";
import { AppContext } from "../AppContext";

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
    </div>
  );
}
