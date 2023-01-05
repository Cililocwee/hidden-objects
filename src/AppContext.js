import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import React, { useState, createContext, useEffect } from "react";
import { db } from "./Firebase";

export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  const [animalList, setAnimalList] = useState([
    "Welcome to Seek and Find Vocabulary!",
  ]);
  const [answerKey, setAnswerKey] = useState([]);
  const [zoo, setZoo] = useState([]);
  const [gameStatus, setGameStatus] = useState("idle");
  const [gameTimeStart, setGameTimeStart] = useState();
  const [gameTimeFinish, setGameTimeFinish] = useState();
  const [gameDuration, setGameDuration] = useState();
  const [highScores, setHighScores] = useState({});
  let animalQueue = [];

  useEffect(() => {
    if (animalList.length === 0) {
      setGameStatus("complete");
      setGameTimeFinish(gameTimerSnapshot());
      setGameDuration(gameTimerSnapshot() - gameTimeStart);
    }
  }, [animalList]);

  useEffect(() => {
    answerKey.forEach((entry) => {
      animalQueue.push(entry.id);
      setAnimalList(animalQueue);
    });
  }, [answerKey]);

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
      console.log("Fetch complete; proceed with hunting");

      setGameStatus("in progress");
      setGameTimeStart(gameTimerSnapshot());
    });
  }

  async function fetchHighScores() {
    await getDocs(collection(db, "high-scores")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      newData.sort((a, b) => a.score - b.score);
      setHighScores(newData);
    });
  }

  async function submitHighScore(id, score) {
    await setDoc(doc(db, "high-scores", id), {
      score: score,
    }).then(fetchHighScores());
  }

  //converts the arr of objs from answerKey into an object
  function convertArrOfObjsToObj(arr) {
    let newObj = {};
    arr.forEach((obj) => {
      newObj[obj.id] = obj.coords;
    });
    return newObj;
  }

  // stores each animal's coords in state obj
  function manipulateZoo(choice) {
    setZoo([...zoo, choice]);
  }

  function gameTimerSnapshot() {
    return new Date().getTime();
  }

  // exports the global states/methods
  const value = {
    animalList,

    changeAnimalList,
    answerKey,
    zoo,
    manipulateZoo,
    startGame,
    convertArrOfObjsToObj,
    gameStatus,
    setGameStatus,
    gameDuration,
    fetchHighScores,
    highScores,
    submitHighScore,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
