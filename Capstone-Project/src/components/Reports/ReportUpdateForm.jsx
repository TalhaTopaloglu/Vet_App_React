import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {  Alert, Button } from "@mui/material" 
import { getReportById, updateReportById } from '../../services/ReportApi';
import { ReportContext } from '../../contexts/ReportContext';



function ReportUpdateForm() {

  const {id} = useParams();
  const navigate = useNavigate();
  const {report , updateReport} = useContext(ReportContext);
  const [showAlert, setShowAlert] = useState(false);
  const [errorList, setErrorList] = useState([]);

  async function update(target){
    target.preventDefault();
    
    try{
      await updateReportById(id, report);
      navigate(`/report`)
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
        const report = await getReportById(id);
        updateReport(report)
      }catch (error){
        console.log(error)
      }
    }
    fetchData();
  },[])

  const handleChange = (event) => {
    const {id, value} = event.target;
    switch(id) {
      case "description":
        updateReport({...report, description: value === "" ? null : value});
        break;
      case "price":
        updateReport({...report, price: value === "" ? null : value});
        break; 
    }
  }



  return (
    <div className='update-form'>
      <h1 style={{borderBottom: "2px solid #00695f", color:"#00695f"}}>Report Id:{report?.id}</h1>
      {showAlert ? (
        errorList.map((item,index) =>{
         return <Alert sx={{width: "40%", margin:"auto", my:3}} key={index}  variant="filled" severity="error">{item}</Alert>
        })):
      <form>
        <div className = "update-form-content">
          <label htmlFor="name">Description</label>
          <input onChange={handleChange} value={report.description || ''} type="text"  id = 'description' />
        </div>
        <div className = "update-form-content">
          <label htmlFor="phone">Price</label>
          <input onChange={handleChange} value={report.price || ''} type="text"  id = 'price' />
        </div>
        <div className = "update-form-content">
          <label htmlFor="phone">Appointment ID</label>
          <input onChange={handleChange} disabled value={report.appointment?.id || ''} type="text"  id = 'appointment' />
        </div>
      </form>}
          <Button sx={{backgroundColor: "#00695f"}} variant='contained' onClick={update} type='submit'>Update</Button>
        </div>
  )
}

export default ReportUpdateForm