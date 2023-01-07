import React, { useContext } from "react";
import "./components.css";
import { useState } from "react";
import SelectionCard from "./SelectionCard";
import { AppContext } from "../AppContext";
import GameBanner from "./GameBanner";
import animalPic from "../assets/ONLY-IMG-find-10-animals.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

// TODO convert to typescript

interface Props {
  classification: string;
}

export default function PlayingField({ classification }: Props) {
  // TODO Better implementation
  const currentContext: any = useContext(AppContext);
  const { animalList } = currentContext;

  const [points, setPoints] = useState<Point[]>([]);
  const [displayFlag, setDisplayFlag] = useState<boolean>(false);

  interface Point {
    x: number;
    y: number;
    xp: number;
    yp: number;
  }

  // TODO Correctly type the even
  function getTargetLocation(e: any): void {
    // This is the pattern it will use
    // const target = e.target as ?????;
    if (displayFlag) {
      setDisplayFlag(false);
    } else {
      setDisplayFlag(true);
    }
    if (animalList.length === 0) {
      return;
    }

    let rect = e.currentTarget.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    // This is good as a start, it only finds the percentage of the WINDOW
    let xPerc = Math.round((x / e.target.width) * 100);
    let yPerc = Math.round((y / e.target.height) * 100);

    setPoints([{ x: x, y: y, xp: xPerc, yp: yPerc }]);

    //** debugging, useful when adding new picture maps
    // console.log([xPerc, yPerc]);
  }

  function notify(type: string): void {
    if (type === "success") {
      toast.success("Correct!");
    } else if (type === "failure") {
      toast.warning("Incorrect...");
    }
  }

  return (
    <div className="playing-field">
      <GameBanner />

      {/* TODO Get rid of classification */}
      <div className={classification}>
        <ToastContainer
          autoClose={1000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          theme="colored"
        />
        <img
          onClick={getTargetLocation}
          src={animalPic}
          alt=""
          className="animal-pic"
        />
      </div>
      {displayFlag &&
        points.map((point) => (
          <SelectionCard
            cardX={point.x}
            cardY={point.y}
            xPerc={point.xp}
            yPerc={point.yp}
            escapeHatch={() => setDisplayFlag(false)}
            signalSuccess={() => notify("success")}
            signalFailure={() => notify("failure")}
            key={uuidv4()}
          />
        ))}
    </div>
  );
}
