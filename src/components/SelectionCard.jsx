import React, { useContext, useState } from "react";
import { AppContext } from "../AppContext";

export default function SelectionCard({ cardX, cardY, escapeHatch }) {
  // todo record coords on click!
  //   const [currentCoords, setCurrentCoords] = useState([cardX, cardY]);
  const [animalChoice, setAnimalChoice] = useState("");

  const { animalList, changeAnimalList } = useContext(AppContext);

  function handleClick(choice) {
    setAnimalChoice(choice);
    changeAnimalList(choice, "remove");
    // console.log(currentCoords);
  }

  function handleCancel(e) {
    changeAnimalList(animalChoice);
    escapeHatch([cardX, cardY]);
  }

  if (!animalChoice) {
    return (
      <div
        className="selection-card"
        style={{
          left: cardX,
          top: cardY,
        }}
      >
        {animalList?.map((animal) => {
          return (
            <p className="animal" onClick={(e) => handleClick(animal, e)}>
              {animal}
            </p>
          );
        })}
        <p>{animalChoice}</p>
      </div>
    );
  } else {
    return (
      <div
        className="selection-card"
        style={{
          left: cardX,
          top: cardY,
        }}
      >
        <p onClick={handleCancel} className="cancel-btn">
          x
        </p>
        <p>{animalChoice}</p>
      </div>
    );
  }
}
