import React, { useContext, useState } from "react";
import { AppContext } from "../AppContext";

export default function SelectionCard({ cardX, cardY, escapeHatch }) {
  const {
    animalList,
    changeAnimalList,
    answerKey,
    convertArrOfObjsToObj,
    manipulateZoo,
  } = useContext(AppContext);

  function handleClick(choice) {
    if (checkAnswer(choice, [cardX, cardY])) {
      changeAnimalList(choice, "remove");
    }
  }

  function checkAnswer(choice, arr) {
    const answerObj = convertArrOfObjsToObj(answerKey);

    let xDiff = answerObj[choice][0] - arr[0];
    let yDiff = answerObj[choice][1] - arr[1];
    const answerDiff = Math.sqrt(xDiff * xDiff + yDiff * yDiff);

    // if selection is within 30px
    if (answerDiff < 30) {
      manipulateZoo(choice);
      return true;
    }
  }

  return (
    <div
      className="selection-card"
      style={{
        left: cardX,
        top: cardY + 85,
      }}
    >
      {animalList?.map((animal) => {
        return (
          <p className="animal" onClick={() => handleClick(animal)}>
            {animal}
          </p>
        );
      })}
    </div>
  );
}
