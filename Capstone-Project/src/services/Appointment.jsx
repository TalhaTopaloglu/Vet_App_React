import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL

const apiURL = `${baseURL}/v1/appointments`;

export const getAppointments = async () => {
    try{
        const response = await axios.get(`${apiURL}?page=0&pageSize=100`);
        return response.data.data.items;
    }catch(error){
        console.log(error);
    }
}

export const getByDoctorNameAndDate = async (doctorId,startDate,endDate) => {
    try{
        const response = await axios.get(`${apiURL}/doctor/${doctorId}/start-date/${startDate}/end-date/${endDate}`);
        return response.data.data;
    }catch(error){
        console.log(error.message);
    }
}

export const getByAnimalNameAndDate = async (animalId,startDate,endDate) => {
    try{
        const response = await axios.get(`${apiURL}/animal/${animalId}/start-date/${startDate}/end-date/${endDate}`);
        return response.data.data;
    }catch(error){
        console.log(error.message);
    }
}

export const getPageableAppointment = async (pageNumber) => {
    try{
        const response = await axios.get(`${apiURL}?page=${pageNumber}&pageSize=10`);
        return response.data.data.items;
    }catch(error){
        console.log(error.message);
    }
}

export const getAppointmentsTotalElement = async () => {
    try{
        const response = await axios.get(apiURL);
        return response.data.data.totalElement;
    }catch(error){
        console.log(error.message);
    }
}

export const createAppointment = async (appointment) => {
    try{
        const response = await axios.post(apiURL, appointment);
        return response.data.data;
    } catch (error) {
       throw(error.response.data);
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
        return response.data.data;
    } catch (error) {
        console.log(error)
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

