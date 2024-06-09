import {useContext, useRef, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { createAppointment, getAppointments} from '../../services/Appointment'
import { AppointmentContext } from '../../contexts/Appointment'
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { getDoctors } from '../../services/DoctorApi';
import { getAnimals } from '../../services/AnimalApi';


function CreateAppointmentForm() {
  const [appointmentList, setAppointmentList] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [doctor, setDoctor] = useState({});


  const {addAppointment} = useContext(AppointmentContext);

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
        setDoctors(doctors)
        setAnimals(animals)
        setAppointmentList(appointments);
      } catch (error) {
        console.log("Error fetching products: " + error);
      }
    }
    fetchData();
  }, []);

  async function add(target) {
    target.preventDefault();

    try {
      const newAppointment = {
        appointmentDate:appointmentDateRef.current.value === "" ? null: appointmentDateRef.current.value,
        doctorId:doctorIdRef.current.value === "" ? null : doctorIdRef.current.value,
        animalId:animalIdRef.current.value === "" ? null : animalIdRef.current.value,
      };
      console.log(newAppointment);
      const response = await createAppointment(newAppointment);
      console.log(response);
      if (response === undefined) {
        return false;
      } else {
        addAppointment(response);
        navigate(`/appointment/${response.id}`);
      }
    } catch (error) {
      console.log(error);
    }
  }




  return (
    <div className="form-container">
      <form className="add-new-form">
        <select className="new-form-select" ref={doctorIdRef} name="doctorId" id="title">
            <option >Doktor Adı</option>
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
          <select className="new-form-select" ref={animalIdRef} name="animalId" id="title">
            <option >Hayvan Adı</option>
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
        >
          Randevu Ekle
        </Button>
      </form>
    </div>
  )
}

export default CreateAppointmentForm