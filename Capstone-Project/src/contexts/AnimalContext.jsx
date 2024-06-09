import { createContext, useState } from "react";

export const AnimalContext = createContext();

// eslint-disable-next-line react/prop-types
export const AnimalListProvider = ({ children }) => {
    
    const [animals , setAnimals] = useState([]);
    const [animal , setAnimal] = useState({});

    
    const updateAnimals = (animals) => {
        setAnimals(animals);
    }

    const addAnimal = (animal) => {
        setAnimals([...animals, animal]);
    }

    const updateAnimal = (animal) => {
        setAnimal(animal);
    } 

    const removeAnimalById = (id) => {
        const newAnimal = animals.filter((animal) => animal.id !== id);
        setAnimals(newAnimal);
    }

    return (
        <AnimalContext.Provider value={{animal, animals, updateAnimals, addAnimal, updateAnimal, removeAnimalById}}>
            {children}
        </AnimalContext.Provider>
    )
}