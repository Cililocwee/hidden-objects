import React, { useContext } from "react";
import { AppContext } from "../AppContext";
import { v4 as uuidv4 } from "uuid";

export default function GameBanner(): JSX.Element {
  // TODO Better implementation
  const currentContext: any = useContext(AppContext);
  const { animalList, zoo } = currentContext;

  return (
    <div className="game-banner" id="game-banner">
      {animalList?.map((animal: string) => (
        <li key={uuidv4()} id={animal}>
          {animal}
        </li>
      ))}
      {zoo?.map((animal: string) => (
        <li key={uuidv4()} style={{ textDecoration: "line-through" }}>
          {animal}
        </li>
      ))}
    </div>
  );
}
