import { createContext, useState } from "react";

export const AvailableDateContext = createContext();

export const AvailableDateListProvider = ({ children }) => {

  const [availableDates, setAvailableDates] = useState([]);
  const [availableDate, setAvailableDate] = useState({});

  const updadeAvailableDates = (availableDates) => {
    setAvailableDates(availableDates);
  };

  const addAvailableDate = (availableDate) => {
    setAvailableDates([...availableDates], availableDate);
  };

  const updateAvailableDate = (availableDate) => {
    setAvailableDate(availableDate);
  };

  const removeAvailableDateById = (id) => {
    const newAvailableDate = availableDates.filter(
      (availableDate) => availableDate.id !== id
    );
    setAvailableDates(newAvailableDate);
  };

  return (
    <AvailableDateContext.Provider
      value={{
        availableDate,
        availableDates,
        updateAvailableDate,
        addAvailableDate,
        updadeAvailableDates,
        removeAvailableDateById,
      }}
    >
      {children}
    </AvailableDateContext.Provider>
  );
};
