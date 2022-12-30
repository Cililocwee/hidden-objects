import React, { useState, createContext } from "react";

export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  const originalAnimalList = ["owl", "rabbit", "bear", "deer"];
  const [animalList, setAnimalList] = useState(originalAnimalList);

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

  const value = {
    animalList,
    resetAnimalList,
    changeAnimalList,
    foo,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
