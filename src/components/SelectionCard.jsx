import React, { useContext, useEffect, useState } from "react";
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

  const [xModifier, setXModifier] = useState(-75);
  const [yModifier, setYModifier] = useState(-75);

  useEffect(() => {
    if (xPerc > 50) {
      // setXModifier(-135);
      setXModifier(-17 * animalList.length);
    } else {
      setXModifier(0);
    }
    if (yPerc > 50) {
      // setYModifier(-135);
      setYModifier(-17 * animalList.length);
    } else {
      setYModifier(0);
    }
  }, [xPerc, yPerc]);

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

  return (
    <div
      className="selection-card"
      style={{
        left: cardX + xModifier,
        top: cardY + yModifier,
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
