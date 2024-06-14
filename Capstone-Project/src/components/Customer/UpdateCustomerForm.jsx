import { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { CustomerContext } from '../../contexts/CustomerContext';
import { getCustomerById, updateCustomerById } from '../../services/CustomerApi';
import {  Alert, Button } from "@mui/material" 
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
function UpdateCustomerForm() {

  const {id} = useParams();
  const navigate = useNavigate();
  const {customer , updateCustomer} = useContext(CustomerContext);
  const [showAlert, setShowAlert] = useState(false);
  const [errorList, setErrorList] = useState([]);

  async function update(target){
    target.preventDefault();
    
    try{
      await updateCustomerById(id, customer);
      navigate(`/customer`)
    }catch(error) {
      setErrorList(error);
      setShowAlert(true)
      setTimeout(() => {
        setShowAlert(false)
      },2000)
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const customer = await getCustomerById(id);
        updateCustomer(customer)
      }catch (error){
        console.log(error)
      }
    }
    fetchData();
  },[])

  const handleChange = (event) => {
    const {id, value} = event.target;
    
    switch(id) {
      case "name":
        updateCustomer({...customer, name: value === "" ? null : value});
        break;
      case "phone":
        updateCustomer({...customer, phone: value === "" ? null : value});
        break;
      case "mail":
        updateCustomer({...customer, mail: value === "" ? null : value});
        break;
      case "address":
        updateCustomer({...customer, address: value === "" ? null : value});
        break;
      case "city":
        updateCustomer({...customer, city: value === "" ? null : value});
        break;
    }
  }

  return (
    <div className='update-form'>
      <NavLink to="/customer"> <ArrowBackRoundedIcon/></NavLink>

      <h1 style={{borderBottom: "2px solid #00695f", color:"#00695f"}}>Customer Id:{customer?.id}</h1>
      {showAlert ? (
        errorList.map((item,index) =>{
         return <Alert sx={{width: "40%", margin:"auto", my:3}} key={index}  variant="filled" severity="error">{item}</Alert>
        })):
      <form>
        <div className = "update-form-content">
          <label htmlFor="name">Name</label>
          <input onChange={handleChange} value={customer.name || ''} type="text"  id = 'name' />
        </div>
        <div className = "update-form-content">
          <label htmlFor="phone">Phone</label>
          <input onChange={handleChange} value={customer.phone || ''} type="text"  id = 'phone' />
        </div>
        <div className = "update-form-content">
          <label htmlFor="mail">Mail</label>
          <input onChange={handleChange} value={customer.mail || ''} type="text"  id = 'mail' />
        </div>
        <div className = "update-form-content">
          <label htmlFor="address">Address</label>
          <input onChange={handleChange} value={customer.address || ''} type="text"  id = 'address' />
        </div>
        <div className = "update-form-content">
          <label htmlFor="city">City</label>
          <input onChange={handleChange} value={customer.city || ''} type="text"  id = 'city' />
        </div>
      </form>}
          <Button sx={{backgroundColor: "#00695f"}} variant='contained' onClick={update} type='submit'>Update</Button>
        </div>
  )
}

export default UpdateCustomerForm