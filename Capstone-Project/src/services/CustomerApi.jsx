import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL

const apiURL = `${baseURL}/v1/customers`; //?page=0&pageSize=10'

export const getCustomers = async () => {
    try{
        const response = await axios.get(`${apiURL}?page=0&pageSize=100`);
        return response.data.data.items;
    }catch(error){
        console.log(error.message);
    }
}

export const getCustomersByName = async (filterName) => {
    try{
        const response = await axios.get(`${apiURL}/name/${filterName}`);
        return response.data.data;
    }catch(error){
        console.log(error.message);
    }
}

export const getPageableCustomers = async (pageNumber) => {
    try{
        const response = await axios.get(`${apiURL}?page=${pageNumber}&pageSize=10`);
        return response.data.data.items;
    }catch(error){
        console.log(error.message);
    }
}

export const getCustomersTotalElement = async () => {
    try{
        const response = await axios.get(apiURL);
        return response.data.data.totalElement;
    }catch(error){
        console.log(error.message);
    }
}

export const createCustomer = async (customer) => {
    try{
        const response = await axios.post(apiURL, customer);
        return response.data.data; 
    } catch (error) {
       throw(error.response.data.data);
    }
}

export const getCustomerById = async (id) => {
    try{
        const response = await axios.get(`${apiURL}/${id}`);
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
}

export const updateCustomerById = async (id, customer) => {
    try{
        const response = await axios.put(`${apiURL}` , customer);
        console.log(response)
        return response.data.data.items;
    } catch (error) {
        throw(error.response.data.data);
    }
}

export const deleteCustomerById = async (id) => {
    try{
        const response = await axios.delete(`${apiURL}/${id}`);
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
}

