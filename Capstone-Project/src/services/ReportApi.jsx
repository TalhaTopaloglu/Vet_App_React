import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL

const apiURL = `${baseURL}/v1/report`

export const getReports = async () => {
    try{
        const response = await axios.get(apiURL);
        return response.data.data.items;
    }catch(error){
        console.log(error);
    }
}

export const createReport = async (report) => {
    try{
        const response = await axios.post(apiURL, report);
        return response.data.data;
    } catch (error) {
       throw(error.response.data.data);
    }
}

export const getReportById = async (id) => {
    try{
        const response = await axios.get(`${apiURL}/${id}`);
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
}

export const updateReportById = async (id, report) => {
    try{
        const response = await axios.put(`${apiURL}` , report);
        return response.data.data.items;
    } catch (error) {
        console.log(error);
    }
}

export const deleteReportById = async (id) => {
    try{
        const response = await axios.delete(`${apiURL}/${id}`);
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
}
