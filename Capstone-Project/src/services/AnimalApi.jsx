import axios from "axios";
const baseURL = import.meta.env.VITE_API_URL
const apiURL = `${baseURL}/v1/animals`

export const getAnimals = async () => {
    try{
        const response = await axios.get(apiURL);
        return response.data.data.items;
    }catch(error){
        console.log(error);
    }
}

export const createAnimal = async (animal) => {
    try{
        const response = await axios.post(apiURL, animal);
        return response.data.data;
    } catch (error) {
       throw(error.response.data.data);
    }
}

export const getAnimalById = async (id) => {
    try{
        const response = await axios.get(`${apiURL}/${id}`);
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
}

export const updateAnimalById = async (id, animal) => {
    try{
        const response = await axios.put(`${apiURL}` , animal);
        return response.data.data.items;
    } catch (error) {
        console.log(error);
    }
}

export const deleteAnimaById = async (id) => {
    try{
        const response = await axios.delete(`${apiURL}/${id}`);
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
}
