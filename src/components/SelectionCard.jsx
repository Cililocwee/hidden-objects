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

  const [xModifier, setXModifier] = useState(0);
  const [yModifier, setYModifier] = useState(0);

  function checkWidth() {
    return window.matchMedia("(max-width: 786px)").matches;
  }

  // useEffect(() => {
  //   console.log(checkWidth());
  //   if (checkWidth()) {
  //     if (xPerc > 50) {
  //       setXModifier(-100);
  //     } else {
  //       setXModifier(0);
  //     }
  //     // if (yPerc > 50) {
  //     //   setYModifier(-55);
  //     // } else {
  //     //   setYModifier(0);
  //     // }
  //   }
  //   if (!checkWidth()) {
  //     if (xPerc > 50) {
  //       setXModifier(-100);
  //     } else {
  //       setXModifier(0);
  //     }
  //     // if (yPerc > 50) {
  //     //   setYModifier(-135);
  //     // } else {
  //     //   setYModifier(35);
  //     // }
  //   }
  // }, [xPerc, yPerc]);

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
          left: cardX - 100,
          top: cardY + 20,
        }}
      >
        <p
          key={crypto.randomUUID()}
          className="animal"
          onClick={() => handleClick(animalList[0])}
        >
          {animalList[0]}
        </p>
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
        <p
          key={crypto.randomUUID()}
          className="animal"
          onClick={() => handleClick(animalList[0])}
        >
          {animalList[0]}
        </p>
      </div>
    );
  }
}
