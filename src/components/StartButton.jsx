import React, { useContext } from "react";
import { AppContext } from "../AppContext";

export default function StartButton() {
  const { startGame } = useContext(AppContext);
  return (
    <div>
      <button onClick={() => startGame()} id="start-btn">
        Start!
      </button>
    </div>
  );
}
