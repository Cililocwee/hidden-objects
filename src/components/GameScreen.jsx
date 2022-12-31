import React from "react";

export default function GameScreen({ children }) {
  return (
    <div className="game-screen">
      GAME OVER!
      {children}
    </div>
  );
}
