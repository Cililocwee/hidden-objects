import React, { useContext } from "react";
import { AppContext } from "../AppContext";
import { v4 as uuidv4 } from "uuid";

interface Props {
  cardX: number;
  cardY: number;
  xPerc: number;
  yPerc: number;
  escapeHatch: () => void;
  signalSuccess: () => void;
  signalFailure: () => void;
}

export default function SelectionCard({
  cardX,
  cardY,
  xPerc,
  yPerc,
  escapeHatch,
  signalSuccess,
  signalFailure,
}: Props): JSX.Element {
  // TODO Better implementation
  const currentContext: any = useContext(AppContext);

  const {
    animalList,
    changeAnimalList,
    answerKey,
    convertArrOfObjsToObj,
    manipulateZoo,
  } = currentContext;

  function handleClick(choice: string): void {
    if (checkAnswer(choice, [xPerc, yPerc])) {
      changeAnimalList(choice, "remove");
    }
  }

  function checkAnswer(choice: string, arr: number[]): boolean | undefined {
    const answerObj = convertArrOfObjsToObj(answerKey);

    let xDiff = Math.abs(answerObj[choice][0] - arr[0]);
    let yDiff = Math.abs(answerObj[choice][1] - arr[1]);

    // if selection is within 8% of the size
    if (xDiff < 10 && yDiff < 10) {
      manipulateZoo(choice);
      escapeHatch();
      signalSuccess();
      return true;
    } else {
      signalFailure();
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
        {animalList?.map((animal: string) => {
          return (
            <p
              key={uuidv4()}
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
        {animalList?.map((animal: string) => {
          return (
            <p
              key={uuidv4()}
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
