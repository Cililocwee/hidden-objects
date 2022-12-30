import { collection, getDocs } from "firebase/firestore";
import React, { useState, createContext } from "react";
import { db } from "./Firebase";

export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  const originalAnimalList = ["owl", "rabbit", "bear", "deer"];
  const [animalList, setAnimalList] = useState(originalAnimalList);
  const [answerKey, setAnswerKey] = useState([]);

  const foo = "apples";

  function resetAnimalList() {
    setAnimalList(originalAnimalList);
  }

  function changeAnimalList(choice, flag = "add") {
    if (flag === "remove") {
      setAnimalList(animalList.filter((animal) => animal !== choice));
    } else {
      setAnimalList([...animalList, choice]);
    }
  }

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

  const value = {
    animalList,
    resetAnimalList,
    changeAnimalList,
    foo,
    fetchAnswers,
    answerKey,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
