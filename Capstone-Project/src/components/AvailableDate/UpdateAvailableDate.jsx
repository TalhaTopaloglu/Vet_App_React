import React, { useContext, useState,useEffect } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { AvailableDateContext } from '../../contexts/AvailableDateContext';
import { getAvailableDateById, updateAvailableDateById } from '../../services/AvailableDateApi';
import { getDoctors, getDoctorsById } from '../../services/DoctorApi';
import { Alert, Button } from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

function UpdateAvailableDate() {

  const {id} = useParams();
  const navigate = useNavigate();
  const {availableDate, updateAvailableDate} = useContext(AvailableDateContext);
  const [showAlert, setShowAlert] = useState(false);
  const [errorList, setErrorList] = useState([]);
  const [doctorList, setDoctorList] = useState([])
  const [selectedDoctor, setSelectedDoctor] = useState();

  async function update(target){
    target.preventDefault();
    
    try{
      await updateAvailableDateById(id, availableDate);
      navigate(`/doctor`)
    }catch(error) {
      setErrorList(["Veri Doğrulama Hatası"]);
      setShowAlert(true)
      setTimeout(() => {
        setShowAlert(false)
      },2000)
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const availableDate = await getAvailableDateById(id);
        updateAvailableDate(availableDate)
        const doctors = await getDoctors();
        setDoctorList(doctors)
        const doctor = await getDoctorsById(availableDate?.doctorId)
        setSelectedDoctor(doctor);
      }catch (error){
        console.log(error)
      }
    }
    fetchData();
  },[])

  const handleChange = (event) => {
    const {id, value} = event.target;
    
    switch(id) {
      case "availableDate":
        updateAvailableDate({...availableDate, availableDate: value === "" ? null : value});
        break;
      case "doctor":
        updateAvailableDate({...availableDate, doctorId: value === "" ? null : value});
        break;
    }
  }

  return (
    <div className="update-form">
      <NavLink to="/doctor"> <ArrowBackRoundedIcon/></NavLink>
    <h1 style={{ borderBottom: "2px solid #00695f", color: "#00695f" }}>
      Work Day Id:{availableDate?.id}
    </h1>
    {showAlert ? (
      errorList.map((item, index) => {
        return (
          <Alert
            sx={{ width: "40%", margin: "auto", my: 3 }}
            key={index}
            variant="filled"
            severity="error"
          >
            {item}
          </Alert>
        );
      })
    ) : (
      <form>
        <div className="update-form-content">
          <label htmlFor="availableDate">Work Day</label>
          <input
            onChange={handleChange}
            value={availableDate.availableDate || ''}
            type="date"
            id="availableDate"
          />
        </div>
        <div className="update-form-content">
          <label htmlFor="doctor">Doctor</label>
          <select onChange={handleChange} name="doctor" id="doctor">
            <option value={selectedDoctor?.id}>
              {selectedDoctor?.name}
            </option>
            {doctorList.map((item, index) => {
              return (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              );
            })}
          </select>
        </div>
      </form>
    )}
    <Button
      sx={{ backgroundColor: "#00695f" }}
      variant="contained"
      onClick={update}
      type="submit"
    >
      Update
    </Button>
  </div>
  )
}

export default UpdateAvailableDate