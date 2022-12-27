import "./App.css";
import ImageSwitcher from "./components/ImageSwitcher";
import db from "./firebase-config";

function App() {
  return (
    <div className="App">
      <ImageSwitcher />
    </div>
  );
}

export default App;
