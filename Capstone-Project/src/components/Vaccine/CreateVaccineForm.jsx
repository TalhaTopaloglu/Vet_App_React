import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createVaccine } from "../../services/VaccineApi";
import { VaccineContext } from "../../contexts/VaccinesContext";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { getAnimals } from "../../services/AnimalApi";
import { getReports } from "../../services/ReportApi";
import { Alert, InputLabel } from "@mui/material";

function CreateVaccineForm() {
  const [animals, setAnimals] = useState([]);
  const [animal ,setAnimal] = useState();
  const [reports, setReports] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [errorList, setErrorList] = useState();
  const { addVaccine } = useContext(VaccineContext);

  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const animals = await getAnimals();
        setAnimals(animals);
        const reports = await getReports();
        setReports(reports);
        console.log(reports)
        console.log(id)
        setAnimal(reports?.find((item) => (item.id == id)).appointment.animal);
      } catch (error) {
        console.log("Error fetching products: " + error);
      }
    }
    fetchData();
  }, []);

  const navigate = useNavigate();
  const nameRef = useRef();
  const codeRef = useRef();
  const protectionStartDateRef = useRef();
  const protectionFinishDateRef = useRef();
  const animalRef = useRef();
  const reportRef = useRef();

  async function add(target) {
    target.preventDefault();
    setErrorList([]);
    try {
      const newVaccine = {
        name: nameRef.current.value === "" ? null : nameRef.current.value ,
        code: codeRef.current.value === "" ? null : codeRef.current.value ,
        protectionStartDate: protectionStartDateRef.current.value,
        protectionFinishDate: protectionFinishDateRef.current.value,
        animalId: animalRef.current.value === "" ? null :animalRef.current.value ,
        reportId: id,
      };
      console.log(newVaccine);
      const response = await createVaccine(newVaccine);
      console.log(response);
      if (response === undefined) {
        return false;
      } else {
        addVaccine(response);
        navigate(`/vaccine/${response.id}`);
      }
    } catch (error) {
      console.log(error.data)
      if(error.data){
        setErrorList(error.data)
      }else {
        setErrorList(["Protection start date cannot be before finish date"])
      }
      setShowAlert(true)
      setTimeout(() => {
        setShowAlert(false)
      },2000)
    }
  }

  return (<>
    <h1
      style={{
        color: "#00695f",
        textDecoration: "underline",
        maxWidth: "1400px",
        margin: "100px auto 20px"
      }}
    >
      Add Vaccine
    </h1>
    <div className="form-container">
    {showAlert ? (
        errorList?.map((item,index) =>{
         return <Alert sx={{width: "40%", margin:"auto", mt:3}} key={index}  variant="filled" severity="error">{item}</Alert>
        })): 
      <form className="add-new-form">
        <TextField
          required
          className="new-form-textfield"
          id="outlined-required"
          label="Vaccine Name"
          inputRef={nameRef}
          type="text"
        />

        <TextField
          required
          className="new-form-textfield"
          id="outlined-required"
          label="Vaccine Code"
          inputRef={codeRef}
          type="text"
        />
       
        <TextField
          required
          className="new-form-textfield"
          id="outlined-required"
          inputRef={protectionStartDateRef}
          type="date"
        />

        <TextField
          required
          className="new-form-textfield"
          id="outlined-required"
          inputRef={protectionFinishDateRef}
          type="date"
        />

        <select
          className="new-form-select"
          ref={animalRef}
          name="animalId"
          id="title"
          disabled
        >
          <option value={animal?.id}>{animal?.name}</option>
        </select>

        <TextField
          required
          className="new-form-textfield"
          id="outlined-required"
          inputRef={reportRef}
          defaultValue={`Report Id : ${id}`}
          type="reportId"
          disabled
        />

        <Button
          className="add-button"
          style={{ backgroundColor: "#00695f" }}
          onClick={add}
          variant="contained"
          endIcon={<SendIcon />}
        >
          Add New Vaccine
        </Button>
      </form>}
    </div>
  </>
  );
}

export default CreateVaccineForm;
