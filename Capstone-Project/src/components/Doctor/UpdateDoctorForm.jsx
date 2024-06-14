import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {  Alert, Button } from "@mui/material"
import { getDoctorsById, updateDoctorById } from '../../services/DoctorApi';
import { DoctorContext } from '../../contexts/DoctorContext';

function UpdateDoctorForm() {

  const {id} = useParams();
  const navigate = useNavigate();
  const {doctor , updateDoctor} = useContext(DoctorContext);
  const [showAlert, setShowAlert] = useState(false);
  const [errorList, setErrorList] = useState([]);

  async function update(target){
    target.preventDefault();
    
    try{
      await updateDoctorById(id, doctor);
      navigate(`/doctor`)
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
        const doctor = await getDoctorsById(id);
        updateDoctor(doctor)
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
        updateDoctor({...doctor, name: value === "" ? null : value});
        break;
      case "phone":
        updateDoctor({...doctor, phone: value === "" ? null : value});
        break;
      case "mail":
        updateDoctor({...doctor, mail: value === "" ? null : value});
        break;
      case "address":
        updateDoctor({...doctor, address: value === "" ? null : value});
        break;
      case "city":
        updateDoctor({...doctor, city: value === "" ? null : value});
        break;
    }
  }



  return (
    <div className='update-form'>
    <h1 style={{borderBottom: "2px solid #00695f", color:"#00695f"}}>doctor Id:{doctor?.id}</h1>
    {showAlert ? (
      errorList.map((item,index) =>{
       return <Alert sx={{width: "40%", margin:"auto", my:3}} key={index}  variant="filled" severity="error">{item}</Alert>
      })):
    <form>
      <div className = "update-form-content">
        <label htmlFor="name">Name</label>
        <input onChange={handleChange} value={doctor.name || ''} type="text"  id = 'name' />
      </div>
      <div className = "update-form-content">
        <label htmlFor="phone">Phone</label>
        <input onChange={handleChange} value={doctor.phone || ''} type="text"  id = 'phone' />
      </div>
      <div className = "update-form-content">
        <label htmlFor="mail">Mail</label>
        <input onChange={handleChange} value={doctor.mail || ''} type="text"  id = 'mail' />
      </div>
      <div className = "update-form-content">
        <label htmlFor="address">Address</label>
        <input onChange={handleChange} value={doctor.address || ''} type="text"  id = 'address' />
      </div>
      <div className = "update-form-content">
        <label htmlFor="city">City</label>
        <input onChange={handleChange} value={doctor.city || ''} type="text"  id = 'city' />
      </div>
    </form>}
        <Button sx={{backgroundColor: "#00695f"}} variant='contained' onClick={update} type='submit'>Update</Button>
      </div>
  )
}

export default UpdateDoctorForm