import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL

const apiURL = `${baseURL}/v1/available-dates`;

export const getAvailableDates = async () => {
    try{
        const response = await axios.get(apiURL);
        return response.data.data.items;
    }catch(error){
        console.log(error);
    }
}

export const createAvailableDate = async (availableDate) => {
    try{
        const response = await axios.post(apiURL, availableDate);
        return response.data.data;
    } catch (error) {
       throw(error.response.data.data);
    }
}

export const getAvailableDateById = async (id) => {
    try{
        const response = await axios.get(`${apiURL}/${id}`);
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
}

export const updateAvailableDateById = async (id, availableDate) => {
    try{
        const response = await axios.put(`${apiURL}` , availableDate);
        console.log(response)
        return response.data.data.items;
    } catch (error) {
        throw(error.response.data.data);
    }
}

export const deleteAvailableDateById = async (id) => {
    try{
        const response = await axios.delete(`${apiURL}/${id}`);
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
}
