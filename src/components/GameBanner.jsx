import React, { useContext } from "react";
import { AppContext } from "../AppContext";

export default function GameBanner() {
  const { animalList, zoo } = useContext(AppContext);

  return (
    <div className="game-banner" id="game-banner">
      {animalList?.map((animal) => (
        <li key={crypto.randomUUID()} id={animal}>
          {animal}
        </li>
      ))}
      {zoo?.map((animal) => (
        <li
          key={crypto.randomUUID()}
          style={{ textDecoration: "line-through" }}
        >
          {animal}
        </li>
      ))}
    </div>
  );
}
