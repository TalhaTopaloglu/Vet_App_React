import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAppointment, getAppointments } from "../../services/Appointment";
import { AppointmentContext } from "../../contexts/Appointment";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { getDoctors } from "../../services/DoctorApi";
import { getAnimals } from "../../services/AnimalApi";
import { Alert } from "@mui/material";

function CreateAppointmentForm() {
  const [appointmentList, setAppointmentList] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [doctor, setDoctor] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [errorList, setErrorList] = useState([]);

  const { addAppointment } = useContext(AppointmentContext);

  const navigate = useNavigate();
  const appointmentDateRef = useRef();
  const doctorIdRef = useRef();
  const animalIdRef = useRef();

  useState(() => {
    async function fetchData() {
      try {
        const appointments = await getAppointments();
        const doctors = await getDoctors();
        const animals = await getAnimals();
        setDoctors(doctors);
        setAnimals(animals);
        setAppointmentList(appointments);
      } catch (error) {
        setErrorList(error);
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 2000);
      }
    }
    fetchData();
  }, []);

  async function add(target) {
    target.preventDefault();

    try {
      const newAppointment = {
        appointmentDate:
          appointmentDateRef.current.value === ""
            ? null
            : appointmentDateRef.current.value,
        doctorId:
          doctorIdRef.current.value === "" ? null : doctorIdRef.current.value,
        animalId:
          animalIdRef.current.value === "" ? null : animalIdRef.current.value,
      };
      const response = await createAppointment(newAppointment);
      if (response === undefined) {
        return false;
      } else {
        addAppointment(response);
        navigate(`/appointment/${response.id}`);
      }
    } catch (error) {
      if(error.error == "Bad Request"){
        setErrorList(["Doctor Name and Customer Name are required!"])
      }else {
        errorList.push(error.message);
      }
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        setErrorList([]);
      }, 2000);
    }
  }

  return (
    <>
      <h1
        style={{
          color: "#00695f",
          textDecoration: "underline",
          maxWidth: "1400px",
          margin: "20px auto",
        }}
      >
        Add Appointment
      </h1>
      <div className="form-container">
        {showAlert ? (
          errorList.map((item, index) => {
            return (
              <Alert
                sx={{ width: "40%", margin: "auto", mt: 3 }}
                key={index}
                variant="filled"
                severity="error"
              >
                {item}
              </Alert>
            );
          })
        ) : (
          <form className="add-new-form">
            <select
              className="new-form-select"
              ref={doctorIdRef}
              name="doctorId"
              id="title"
            >
              <option>Doktor Adı</option>
              {doctors?.map((item, index) => (
                <option key={index} value={`${item.id}`}>
                  {item?.name}
                </option>
              ))}
            </select>

            <TextField
              required
              className="new-form-textfield"
              id="outlined-required"
              inputRef={appointmentDateRef}
              type="datetime-local"
            />
            <select
              className="new-form-select"
              ref={animalIdRef}
              name="animalId"
              id="title"
            >
              <option>Hayvan Adı</option>
              {animals?.map((item, index) => (
                <option key={index} value={`${item.id}`}>
                  {item?.name}
                </option>
              ))}
            </select>
            <Button
              className="add-button"
              onClick={add}
              variant="contained"
              endIcon={<SendIcon />}
              style={{ backgroundColor: "#00695f" }}
            >
              Add New Appointment
            </Button>
          </form>
        )}
      </div>
    </>
  );
}

export default CreateAppointmentForm;
