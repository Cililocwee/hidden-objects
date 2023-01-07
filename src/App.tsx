import "./App.css";
import PlayingField from "./components/PlayingField";
import GameOverlay from "./components/GameOverlay";
import React from "react";

function App(): JSX.Element {
  return (
    <div className="App">
      <GameOverlay />
      <PlayingField classification="animals-tag" />
    </div>
  );
}

export default App;
