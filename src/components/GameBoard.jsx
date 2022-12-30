import React, { useContext, useState } from "react";
import SelectionCard from "./SelectionCard";
import "./components.css";
import { AppContext } from "../AppContext";

export default function GameBoard() {
  const { foo, animalList } = useContext(AppContext);

  return (
    <div className="gameboard">
      <div>
        List:
        {animalList?.map((animal) => {
          return <p>{animal}</p>;
        })}
      </div>
      <SelectionCard animalList={animalList} />
      <h1>{foo}</h1>
    </div>
  );
}
