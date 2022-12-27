import React from "react";
import { useState } from "react";

export default function PopUpSelection({
  boxX,
  boxY,
  animalArray,
  animalHandler,
}) {
  const [selection, setSelection] = useState("");

  const handleSelection = (choice, foo) => {
    setSelection(choice);
    // removes choices after selection
    // TODO this feels dirty
    animalHandler(animalArray.filter((animal) => animal !== choice));
    foo.target.parentElement.remove();
  };

  return (
    <div
      className="point select-box"
      style={{
        left: boxX,
        top: boxY,
      }}
    >
      <div className="selection-pane">
        {animalArray.map((animal) => (
          <div
            className="selection"
            onClick={(e) => handleSelection(animal, e)}
          >
            {animal}
          </div>
        ))}
      </div>

      <h3 style={{ color: "black" }}>{selection}</h3>
    </div>
  );
}
