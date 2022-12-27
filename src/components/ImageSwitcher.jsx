import React from "react";
import PlayingField from "./PlayingField";
import { useState } from "react";
import AnimalsPic from "../assets/ONLY-IMG-find-10-animals.jpg";
import ObjectsPic from "../assets/ONLY-IMG-find-10-objects.jpg";

export default function ImageSwitcher() {
  const [imageUp, setImageUp] = useState("animals");
  const [imageDisplaying, setImageDisplaying] = useState(AnimalsPic);
  const [classified, setClassified] = useState("animals-tag");

  const handleSwitchingImages = (key) => {
    if (key === "animals") {
      setImageUp("animals");
      setImageDisplaying(AnimalsPic);
      setClassified("animals-tag");
    } else if (key === "objects") {
      setImageUp("objects");
      setImageDisplaying(ObjectsPic);
      setClassified("objects-tag");
    } else {
      console.log("There's been an error and images aren't working");
    }
  };

  return (
    <div className="image-switcher-wrapper">
      <h1>Find the {imageUp}!</h1>
      <div className="button-div">
        <button onClick={() => handleSwitchingImages("animals")}>
          Animals
        </button>
        <button onClick={() => handleSwitchingImages("objects")}>
          Objects
        </button>
      </div>
      <PlayingField sourceImage={imageDisplaying} classification={classified} />
    </div>
  );
}
