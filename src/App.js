import "./App.css";
import PlayingField from "./components/PlayingField";
import AnimalsPic from "./assets/ONLY-IMG-find-10-animals.jpg";

function App() {
  return (
    <div className="App">
      <PlayingField sourceImage={AnimalsPic} classification="animals-tag" />
    </div>
  );
}

export default App;
