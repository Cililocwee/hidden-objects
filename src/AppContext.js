import { async } from "@firebase/util";
import { collection, getDocs } from "firebase/firestore";
import React, { useState, createContext } from "react";
import { db } from "./Firebase";

export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  const originalAnimalList = ["owl", "rabbit", "bear", "deer"];
  const [animalList, setAnimalList] = useState(originalAnimalList);
  const [answerKey, setAnswerKey] = useState([]);
  const [zoo, setZoo] = useState([]);

  function resetAnimalList() {
    setAnimalList(originalAnimalList);
  }

  // adds or removes animals from the list as they are chosen
  function changeAnimalList(choice, flag = "add") {
    if (flag === "remove") {
      setAnimalList(animalList.filter((animal) => animal !== choice));
    } else {
      setAnimalList([...animalList, choice]);
    }
  }

  // ** copy of startGame from debugging
  // TODO prune***
  // This queries the database for the answers
  const fetchAnswers = async () => {
    await getDocs(collection(db, "animal-locs")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setAnswerKey(newData);
      console.log(answerKey, newData);
    });
  };

  //This queries the database for the answers and returns an object
  // containing keys of animals with their values for checking again
  async function startGame() {
    await getDocs(collection(db, "animal-locs")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setAnswerKey(newData);
      console.log("Fetch complete");
    });
  }

  //converts the arr of objs from answerKey into an object
  function convertArrOfObjsToObj(arr) {
    let newObj = {};
    arr.forEach((obj) => {
      newObj[obj.id] = obj.coords;
    });
    return newObj;
  }

  // show the answer key in log
  function revealAnswers() {
    console.log(answerKey);
  }

  // for debugging purposes, reveals what is in the zoo
  function checkZoo() {
    console.log(zoo);
  }

  // stores each animal's coords in state obj
  function manipulateZoo(choice) {
    setZoo([...zoo, choice]);
  }

  // exports the global states/methods
  const value = {
    animalList,
    resetAnimalList,
    changeAnimalList,
    fetchAnswers,
    answerKey,
    checkZoo,
    zoo,
    manipulateZoo,
    startGame,
    revealAnswers,
    convertArrOfObjsToObj,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
