import axios from "axios";
const baseURL = import.meta.env.VITE_BASE_URL
const apiURL = `${baseURL}/v1/animals`

export const getAnimals = async () => {
    try{
        const response = await axios.get(`${apiURL}?page=0&pageSize=100`);
        return response.data.data.items;
    }catch(error){
        console.log(error);
    }
}


export const getAnimalsByCustomerName = async (filterName) => {
    try{
        const response = await axios.get(`${apiURL}/customer/${filterName}`);
        return response.data.data;
    }catch(error){
        console.log(error.message);
    }
}

export const getAnimalsByName = async (filterName) => {
    try{
        const response = await axios.get(`${apiURL}/name/${filterName}`);
        return response.data.data;
    }catch(error){
        console.log(error);
    }
}

export const getPageableAnimals = async (pageNumber) => {
    try{
        const response = await axios.get(`${apiURL}?page=${pageNumber}&pageSize=10`);
        return response.data.data.items;
    }catch(error){
        console.log(error.message);
    }
}

export const getAnimalsTotalElement = async () => {
    try{
        const response = await axios.get(apiURL);
        return response.data.data.totalElement;
    }catch(error){
        console.log(error.message);
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
        throw(error);
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
