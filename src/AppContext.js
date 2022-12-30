import React, { useState, createContext } from "react";

export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  const [animalList, setAnimalList] = useState([
    "owl",
    "rabbit",
    "bear",
    "deer",
  ]);

  const foo = "apples";

  const originalAnimalList = ["owl", "rabbit", "bear", "deer"];

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

  const value = {
    animalList,
    resetAnimalList,
    changeAnimalList,
    foo,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
