import "./App.css";
import ImageSwitcher from "./components/ImageSwitcher";
import PlayingField from "./components/PlayingField";
import db from "./firebase-config";
import AnimalsPic from "./assets/ONLY-IMG-find-10-animals.jpg";
import GameBoard from "./components/GameBoard";

function App() {
  return (
    <div className="App">
      <GameBoard />
      {/* <ImageSwitcher /> */}
      {/* <PlayingField sourceImage={AnimalsPic} classification="animals-tag" /> */}
    </div>
  );
}

export default App;
