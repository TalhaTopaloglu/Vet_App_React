import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL

const apiURL = `${baseURL}/v1/doctors`

export const getDoctors = async () => {
    try{
        const response = await axios.get(apiURL);
        return response.data.data.items;
    }catch(error){
        console.log(error);
    }
}

export const createDoctor = async (doctor) => {
    try{
        const response = await axios.post(apiURL, doctor);
        return response.data.data;
    } catch (error) {
       throw(error.response.data.data);
    }
}

export const getDoctorsById = async (id) => {
    try{
        const response = await axios.get(`${apiURL}/${id}`);
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
}

export const updateDoctorById = async (id, doctor) => {
    try{
        const response = await axios.put(`${apiURL}` , doctor);
        console.log(response)
        return response.data.data.items;
    } catch (error) {
        throw(error.response.data.data);
    }
}

export const deleteDoctorById = async (id) => {
    try{
        const response = await axios.delete(`${apiURL}/${id}`);
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
}