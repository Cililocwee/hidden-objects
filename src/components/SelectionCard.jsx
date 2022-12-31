import React, { useContext, useState } from "react";
import { AppContext } from "../AppContext";

export default function SelectionCard({ cardX, cardY, escapeHatch }) {
  // todo record coords on click!
  //   const [currentCoords, setCurrentCoords] = useState([cardX, cardY]);
  const [animalChoice, setAnimalChoice] = useState("");

  const {
    animalList,
    changeAnimalList,
    manipulateZoo,
    answerKey,
    convertArrOfObjsToObj,
    zoo,
  } = useContext(AppContext);

  // ** Right now when you select and then cancel, it's reverting the list and messing with
  // ** any choice you've made before, get around this by not having the boxes persist
  //TODO boxes dissapear on selection, need a top selector list that lists character yet found
  // TODO and as they are successfully selected, the gray out or cross out
  // TODO Boxes don't need to persist and no longer have to to have individual cards keep track
  // TODO of animal selection
  function handleClick(choice) {
    // ** should take in the choice as a key and add an arr with coords
    manipulateZoo([choice], [cardX, cardY]);

    // shows which animal was selected
    setAnimalChoice(choice);
    // removes animal from the selection list
    changeAnimalList(choice, "remove");

    // TODO beginning of refactor
    checkAnswer(choice);
  }

  // !! This should only be for debugging, in final release, this should be unused
  function handleCancel() {
    changeAnimalList(animalChoice);
    escapeHatch([cardX, cardY]);
  }

  function checkAnswer(choice) {
    const answerObj = convertArrOfObjsToObj(answerKey);
    // console.log(choice);
    // console.log([cardX, cardY]);
    // console.log(answerKey);
    // console.log(answerObj);
    // console.log(answerObj[choice]);
    // console.log(zoo);

    let xDiff = answerObj[choice][0] - zoo[choice][0];
    let yDiff = answerObj[choice][1] - zoo[choice][1];
    console.log(Math.sqrt(xDiff * xDiff + yDiff * yDiff));
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
