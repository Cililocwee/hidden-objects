import React, { useState } from "react";

export default function SelectionCard({ animalList, setAnimalList }) {
  const [currentCoords, setCurrentCoords] = useState([]);
  const [animalChoice, setAnimalChoice] = useState("");

  const originalList = [...animalList];

  function handleClick(choice) {
    setAnimalChoice(choice);

    //!! Don't do this. Set context and store the animal list in the context
    setAnimalList(animalList.filter((animal) => !choice));
  }

  function handleCancel() {
    setAnimalChoice("");
    setAnimalList(originalList);
  }

  if (!animalChoice) {
    return (
      <div className="selection-card">
        {animalList?.map((animal) => {
          return (
            <p className="animal" onClick={() => handleClick(animal)}>
              {animal}
            </p>
          );
        })}
        <p>{animalChoice}</p>
      </div>
    );
  } else {
    return (
      <div className="selection-card">
        <p onClick={handleCancel} className="cancel-btn">
          x
        </p>
        <p>{animalChoice}</p>
      </div>
    );
  }
}
