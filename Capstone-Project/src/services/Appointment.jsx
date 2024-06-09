import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL

const apiURL = `${baseURL}/v1/appointments`;

export const getAppointments = async () => {
    try{
        const response = await axios.get(apiURL);
        return response.data.data.items;
    }catch(error){
        console.log(error);
    }
}

export const createAppointment = async (appointment) => {
    try{
        const response = await axios.post(apiURL, appointment);
        return response.data.data;
    } catch (error) {
       throw(error.response.data.data);
    }
}

export const getAppointmentById = async (id) => {
    try{
        const response = await axios.get(`${apiURL}/${id}`);
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
}

export const updateAppointmentById = async (id, appointment) => {
    try{
        const response = await axios.put(`${apiURL}` , appointment);
        console.log(response)
        return response.data.data.items;
    } catch (error) {
        throw(error.response.data.data);
    }
}

export const deleteAppointmentById = async (id) => {
    try{
        const response = await axios.delete(`${apiURL}/${id}`);
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
}

