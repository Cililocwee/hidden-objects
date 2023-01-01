import { collection, getDocs } from "firebase/firestore";
import React, { useState, createContext, useEffect } from "react";
import { db } from "./Firebase";

export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  const originalAnimalList = ["owl", "rabbit", "bear", "deer"];
  const [animalList, setAnimalList] = useState(originalAnimalList);
  const [answerKey, setAnswerKey] = useState([]);
  const [zoo, setZoo] = useState([]);
  const [gameStatus, setGameStatus] = useState("idle");
  const [gameTimeStart, setGameTimeStart] = useState();
  const [gameTimeFinish, setGameTimeFinish] = useState();
  const [gameDuration, setGameDuration] = useState();

  useEffect(() => {
    if (animalList.length === 0) {
      setGameStatus("complete");
      setGameTimeFinish(gameTimerSnapshot());
      setGameDuration(gameTimerSnapshot() - gameTimeStart);
      console.log(gameDuration);
    }
  }, [animalList]);

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
      setGameStatus("in progress");
      setGameTimeStart(gameTimerSnapshot());
      console.log(gameTimerSnapshot());
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

  function gameTimerSnapshot() {
    return new Date().getTime();
  }

  function gameTimerStart() {
    return new Date().getTime();
  }

  function gameTimerFinish(start) {
    return new Date().getTime() - start;
  }
  // exports the global states/methods
  const value = {
    animalList,
    resetAnimalList,
    changeAnimalList,
    answerKey,
    checkZoo,
    zoo,
    manipulateZoo,
    startGame,
    revealAnswers,
    convertArrOfObjsToObj,
    gameStatus,
    setGameStatus,
    gameDuration,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
