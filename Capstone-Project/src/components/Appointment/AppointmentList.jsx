import { useContext, useEffect, useState } from "react";
import { AppointmentContext } from "../../contexts/Appointment";
import { getAppointments, getByAnimalNameAndDate, getByDoctorNameAndDate } from "../../services/Appointment";
import {
  Button,
  Input,
  Table,
  TableBody,
  TableHead,
  TableRow,
  colors,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import AppointmentTableRow from "./AppointmentTableRow";
import CreateAppointmentForm from "./CreateAppointmentForm";
import { getAnimals } from "../../services/AnimalApi";
import { getDoctors } from "../../services/DoctorApi";
import Loading from "../General/Loading";

function AppointmentList() {
  const { appointments, updateAppointments } = useContext(AppointmentContext);
  const [isLoading, setIsLoading] = useState(false);
  const [startDateAnimal, setStartDateAnimal] = useState();
  const [endDateAnimal, setEndDateAnimal] = useState();
  const [filterNameAnimal, setFilterNameAnimal] = useState();
  const [startDateDoctor, setStartDateDoctor] = useState();
  const [endDateDoctor, setEndDateDoctor] = useState();
  const [filterNameDoctor, setFilterNameDoctor] = useState();
  const [animalList, setAnimalList] = useState([]); 
  const [doctorList, setDoctorList] = useState([]); 


  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#00695f",
      color: theme.palette.common.white,
      fontSize: 20,
    },
  }));

  const handleChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;
    switch (name) {
      case "startDateAnimalInput":
        setStartDateAnimal(value);
        break;
      case "endDateAnimalInput":
        setEndDateAnimal(value);
        break;
      case "filterNameAnimalInput":
        setFilterNameAnimal(value);
        break;
      case "startDateDoctorInput":
        setStartDateDoctor(value);
        break;
      case "endDateDoctorInput":
        setEndDateDoctor(value);
        break;
      case "filterNameDoctorInput":
        setFilterNameDoctor(value);
        break;
      default:
        break;
    }
  };


  async function filterByAnimal(startDateAnimal,endDateAnimal,filterNameAnimal) {
    const filterIdAnimal = animalList?.find((item) => {
      if(item.name == filterNameAnimal){
        return item.id
      }})

    try {
      const filterAppointment = await getByAnimalNameAndDate(filterIdAnimal?.id,startDateAnimal,endDateAnimal);
      updateAppointments(filterAppointment);
    } catch (error) {
      console.log(error);
    }
  }

  async function filterByDoctor(startDateAnimal,endDateAnimal,filterNameDoctor) {
    const filterIdDoctor = doctorList?.find((item) => {
      if(item.name == filterNameDoctor){
        return item.id
      }})

    try {
      const filterAppointment = await getByDoctorNameAndDate(filterIdDoctor?.id,startDateAnimal,endDateAnimal);
      updateAppointments(filterAppointment);
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    async function fetchData() {
      try {
        const appointments = await getAppointments();
        updateAppointments(appointments);
        const animals = await getAnimals();
        setAnimalList(animals);
        const doctors = await getDoctors();
        setDoctorList(doctors);
        setIsLoading(true);
      } catch (error) {
        console.log("Error fetching products: " + error);
      }
    }
    fetchData();
  }, []);

  function resetSearch(){

    setStartDateAnimal("");
    setEndDateAnimal("");
    setFilterNameAnimal("");
    setStartDateDoctor("");
    setEndDateDoctor("");
    setFilterNameDoctor("");

    async function fetchData() {
      try {
        const appointments = await getAppointments();
        updateAppointments(appointments);
        const animals = await getAnimals();
        setAnimalList(animals);
        const doctors = await getDoctors();
        setDoctorList(doctors);
        setIsLoading(true);
      } catch (error) {
        console.log("Error fetching products: " + error);
      }
    }
    fetchData();
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          maxWidth: "1400px",
          alignItems: "center",
          margin: "auto",
        }}
      >
        <div
          style={{
            margin: "100px 0 20px 0",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "1400px",
          }}
        >
          <h1
            style={{
              color: "#00695f",
              textAlign: "center",
              textDecoration: "underline",
            }}
          >
            Appointment Managment
          </h1>
          <div>
            <Input
              name="startDateAnimalInput"
              onChange={handleChange}
              value={startDateAnimal  || ''}
              type="date"
            />
            <Input
              name="endDateAnimalInput"
              onChange={handleChange}
              value={endDateAnimal  || ''}
              type="date"
            />
            <Input
              name="filterNameAnimalInput"
              placeholder="Pet Name"
              onChange={handleChange}
              value={filterNameAnimal  || ''}
              type="text"
            />
            <Button variant = "contained" sx={{backgroundColor: "#00695f", m:2}} onClick={() => filterByAnimal(startDateAnimal, endDateAnimal, filterNameAnimal)}>Search</Button>
            <Button variant = "contained" sx={{backgroundColor: "#00695f"}} onClick={resetSearch} > Reset Search </Button>
            <br />
            <Input
              name="startDateDoctorInput"
              onChange={handleChange}
              value={startDateDoctor  || ''}
              type="date"
            />
            <Input
              name="endDateDoctorInput"
              onChange={handleChange}
              value={endDateDoctor  || ''}
              type="date"
            />
            <Input
              name="filterNameDoctorInput"
              placeholder="Doctor Name"
              onChange={handleChange}
              value={filterNameDoctor  || ''}
              type="text"
            />
            
            <Button variant = "contained" sx={{backgroundColor: "#00695f", mx:2}} onClick={() => filterByDoctor(startDateDoctor, endDateDoctor, filterNameDoctor)}>Search</Button>

          </div>
        </div>
      </div>
      <Table className="table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell>Doctor Name</StyledTableCell>
            <StyledTableCell>Pet Name</StyledTableCell>
            <StyledTableCell>Report Description</StyledTableCell>
            <StyledTableCell>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {!isLoading ? (
            <Loading />
          ) : (
            appointments?.map((appointment) => (
              <AppointmentTableRow key={appointment.id} {...appointment} />
            ))
          )}
        </TableBody>
      </Table>
      <div>
        <CreateAppointmentForm />
      </div>
    </div>
  );
}

export default AppointmentList;
