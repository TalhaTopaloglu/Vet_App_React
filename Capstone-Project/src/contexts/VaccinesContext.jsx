import { createContext, useState } from "react";

export const VaccineContext = createContext();

export const VaccineListProvider = ({ children }) => {
  const [vaccines, setVaccines] = useState([]);
  const [vaccine, setVaccine] = useState({});

  const updateVaccines = (vaccines) => {
    setVaccines(vaccines);
  };

  const addVaccine = (vaccine) => {
    setVaccines([...vaccines, vaccine]);
  };

  const updateVaccine = (vaccine) => {
    setVaccine(vaccine);
  };

  const removeVaccineById = (id) => {
    const newVaccine = vaccines.filter((vaccine) => vaccine.id !== id);
    setVaccines(newVaccine);
  };

  return (
    <VaccineContext.Provider
      value={{
        vaccine,
        vaccines,
        updateVaccines,
        addVaccine,
        updateVaccine,
        removeVaccineById,
      }}
    >
      {children}
    </VaccineContext.Provider>
  );
};