import {useContext, useState,useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getVaccineById, updateVaccineById } from '../../services/VaccineApi';
import { VaccineContext } from '../../contexts/VaccinesContext';
import {  Alert, Button } from "@mui/material" 

function UpdateVaccineForm() {

  const {id} = useParams();
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [errorList, setErrorList] = useState([]);
  const {vaccine , updateVaccine} = useContext(VaccineContext);


  async function update(target){
    target.preventDefault();

    
    try{
      await updateVaccineById(id, vaccine);
   
      navigate(`/vaccine`)
    }catch(error) {
      setErrorList(error.response.data.data);
      setShowAlert(true)
      setTimeout(() => {
        setShowAlert(false)
      },2000)
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const vaccine = await getVaccineById(id);
        updateVaccine(vaccine);
        console.log(vaccine)
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
        updateVaccine({...vaccine, name: value === "" ? null : value});
        break;
      case "code":
        updateVaccine({...vaccine, code: value === "" ? null : value});
      break;
    }
  }



  return (
    <div className='update-form'>
    <h1 style={{borderBottom: "2px solid #00695f", color:"#00695f"}}>Vaccine Id:{vaccine?.id}</h1>
    {showAlert ? (
      errorList.map((item,index) =>{
       return <Alert sx={{width: "40%", margin:"auto", my:3}} key={index}  variant="filled" severity="error">{item}</Alert>
      })):
    <form>
      <div className = "update-form-content">
        <label htmlFor="name">Name</label>
        <input onChange={handleChange} value={vaccine.name || ''} type="text"  id = 'name' />
      </div>
      <div className = "update-form-content">
        <label htmlFor="phone">Code</label>
        <input onChange={handleChange} value={vaccine.code || ''} type="text"  id = 'code' />
      </div>
      <div className = "update-form-content">
        <label htmlFor="mail">Protection Start Date</label>
        <input disabled onChange={handleChange} value={vaccine.protectionStartDate || ''} type="text"  id = 'startDate' />
      </div>
      <div className = "update-form-content">
        <label htmlFor="address">Protection End Date</label>
        <input disabled onChange={handleChange} value={vaccine.protectionFinishDate || ''} type="text"  id = 'finishDate' />
      </div>
      <div className = "update-form-content">
        <label htmlFor="address">Pet Name</label>
        <input disabled onChange={handleChange} value={vaccine?.animal?.name || ''} type="text"  id = 'animalId' />
      </div>
      <div className = "update-form-content">
        <label htmlFor="address">Report Description</label>
        <input disabled onChange={handleChange} value={vaccine?.report?.description || ''} type="text"  id = 'reportId' />
      </div>
    </form>
   } 
        <Button sx={{backgroundColor: "#00695f"}} variant='contained' onClick={update} type='submit'>Update</Button>
      </div>
  )
}

export default UpdateVaccineForm