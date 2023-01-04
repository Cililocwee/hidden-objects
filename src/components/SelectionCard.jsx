import React, { useContext, useState } from "react";
import { AppContext } from "../AppContext";

export default function SelectionCard({ cardX, cardY, xPerc, yPerc }) {
  const {
    animalList,
    changeAnimalList,
    answerKey,
    convertArrOfObjsToObj,
    manipulateZoo,
  } = useContext(AppContext);

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
      return true;
    }
  }

  return (
    <div
      className="selection-card"
      style={{
        left: cardX + 50,
        top: cardY + 155,
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
