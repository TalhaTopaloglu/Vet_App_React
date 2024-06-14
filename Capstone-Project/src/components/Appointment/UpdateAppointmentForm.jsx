import React from "react";
import { Alert, Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { getAnimals } from "../../services/AnimalApi";
import { getAppointmentById, updateAppointmentById } from "../../services/Appointment";
import { AppointmentContext } from "../../contexts/Appointment";
import { getDoctors} from "../../services/DoctorApi";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

function UpdateAppointmentForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { appointment, updateAppointment } = useContext(AppointmentContext);
  const [showAlert, setShowAlert] = useState(false);
  const [errorList, setErrorList] = useState([]);
  const [doctorList, setDoctorList] = useState([]);
  const [animalList, setAnimalList] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedAnimal, setSelectedAnimal] = useState("");

  async function update(target) {
    target.preventDefault();
    try {
      await updateAppointmentById(id, appointment);
      navigate(`/appointment`);
    } catch (error) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const appointment = await getAppointmentById(id);
        appointment.animalId = appointment?.animal?.id || ""; 
        appointment.doctorId = appointment?.doctor?.id || ""; 
        updateAppointment(appointment);
        setSelectedDoctor(appointment.doctor);
        setSelectedAnimal(appointment.animal);
        const doctors = await getDoctors();
        setDoctorList(doctors);
        const animals = await getAnimals();
        setAnimalList(animals);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const handleChange = (event) => {
    const { id, value } = event.target;

    switch (id) {
      case "appointmentDate":
        updateAppointment({
          ...appointment,
          appointmentDate: value === "" ? null : value,
        });
        break;
    }

    const fieldMap = {
      doctor: "doctorId",
      animal: "animalId"
    };

    if (fieldMap[id]) {
      updateAppointment({ ...appointment, [fieldMap[id]]: value === "" ? null : value});
    }
  };

  return (
    <div className="update-form">
      <NavLink to="/appointment"> <ArrowBackRoundedIcon /></NavLink>
      <h1 style={{ borderBottom: "2px solid #00695f", color: "#00695f" }}>
        Appointment Id:{appointment?.id}
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
            <label htmlFor="appointmentDate">Appointment Date</label>
            <input
              onChange={handleChange}
              value={appointment.appointmentDate || ""}
              type="datetime-local"
              id="appointmentDate"
            />
          </div>
          <div className="update-form-content">
            <label htmlFor="doctor">Doctor</label>
            <select onChange={handleChange} name="doctor" id="doctor">
              <option value={selectedDoctor?.id}>{selectedDoctor?.name}</option>
              {doctorList.map((item, index) => {
                return (
                  <option key={index} value={item.id}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="update-form-content">
            <label htmlFor="animal">Animal</label>
            <select onChange={handleChange} name="animal" id="animal">
              <option value={selectedAnimal?.id}>{selectedAnimal?.name}</option>
              {animalList.map((item, index) => {
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
  );
}

export default UpdateAppointmentForm;
