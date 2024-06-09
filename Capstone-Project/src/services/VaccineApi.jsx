import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL

const apiURL = `${baseURL}/v1/vaccines`;

export const getVaccines = async () => {
    try{
        const response = await axios.get(apiURL);
        console.log(response)
        return response.data.data.items;
    }catch(error){
        console.log(error.message);
    }
}

export const createVaccine = async (vaccine) => {
    try{
        const response = await axios.post(apiURL, vaccine);
        console.log(response)
        return response.data.data; 
    } catch (error) {
       throw(error.message); //error.response.data.data
    }
}

export const getVaccineById = async (id) => {
    try{
        const response = await axios.get(`${apiURL}/${id}`);
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
}

export const updateVaccineById = async (id, vaccine) => {
    try{
        const response = await axios.put(`${apiURL}` , vaccine);
        console.log(response)
        return response.data.data.items;
    } catch (error) {
        throw(error.response.data.data);
    }
}

export const deleteVaccineById = async (id) => {
    try{
        const response = await axios.delete(`${apiURL}/${id}`);
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
}

