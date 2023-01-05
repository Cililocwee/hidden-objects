import React, { useContext, useState } from "react";
import { AppContext } from "../AppContext";

export default function SelectionCard({
  cardX,
  cardY,
  xPerc,
  yPerc,
  escapeHatch,
  signal,
}) {
  const {
    animalList,
    changeAnimalList,
    answerKey,
    convertArrOfObjsToObj,
    manipulateZoo,
  } = useContext(AppContext);

  const [xModifier, setXModifier] = useState(0);
  const [yModifier, setYModifier] = useState(0);

  function checkWidth() {
    return window.matchMedia("(max-width: 786px)").matches;
  }

  function handleClick(choice) {
    if (checkAnswer(choice, [xPerc, yPerc])) {
      changeAnimalList(choice, "remove");
    }
  }

  function checkAnswer(choice, arr) {
    const answerObj = convertArrOfObjsToObj(answerKey);

    let xDiff = Math.abs(answerObj[choice][0] - arr[0]);
    let yDiff = Math.abs(answerObj[choice][1] - arr[1]);

    // if selection is within 8% of the size
    if (xDiff < 10 && yDiff < 10) {
      manipulateZoo(choice);
      escapeHatch();
      signal("success");
      return true;
    } else {
      signal();
      escapeHatch();
    }
  }

  if (xPerc > 50) {
    return (
      <div
        className="selection-card"
        style={{
          left: cardX - 125,
          top: cardY - 25,
        }}
      >
        {animalList?.map((animal) => {
          return (
            <p
              key={crypto.randomUUID()}
              className="animal"
              onClick={() => handleClick(animal)}
            >
              {animal}
            </p>
          );
        })}
      </div>
    );
  } else {
    return (
      <div
        className="selection-card"
        style={{
          left: cardX - 5,
          top: cardY + 20,
        }}
      >
        {animalList?.map((animal) => {
          return (
            <p
              key={crypto.randomUUID()}
              className="animal"
              onClick={() => handleClick(animal)}
            >
              {animal}
            </p>
          );
        })}
      </div>
    );
  }
}
