import "./App.css";
import PlayingField from "./components/PlayingField";
import AnimalsPic from "./assets/ONLY-IMG-find-10-animals.jpg";
import GameOverlay from "./components/GameOverlay";

function App() {
  return (
    <div className="App">
      <GameOverlay content="Hello world" />
      <PlayingField sourceImage={AnimalsPic} classification="animals-tag" />
    </div>
  );
}

export default App;
