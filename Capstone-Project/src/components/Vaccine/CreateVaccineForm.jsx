import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createVaccine } from "../../services/VaccineApi";
import { VaccineContext } from "../../contexts/VaccinesContext";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { getAnimals } from "../../services/AnimalApi";
import { getReports } from "../../services/ReportApi";

function CreateVaccineForm() {

    const [animals, setAnimals] = useState([]);
    const [reports, setReports] = useState([]);
    const { addVaccine } = useContext(VaccineContext);


  useEffect(() => {
    async function fetchData() {
      try {
        const animals = await getAnimals();
        setAnimals(animals);
        const reports = await getReports();
        setReports(reports);
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

    try {
      const newVaccine = {
        name: nameRef.current.value,
        code: codeRef.current.value,
        protectionStartDate: protectionStartDateRef.current.value,
        protectionFinishDate: protectionFinishDateRef.current.value,
        animalId: animalRef.current.value,
        reportId: reportRef.current.value,
      };
      console.log(newVaccine)
      const response = await createVaccine(newVaccine);
      console.log(response)
      if (response === undefined) {
        return false;
      } else {
        addVaccine(response);
        navigate(`/vaccine/${response.id}`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="form-container">
      <form className="add-new-form">
        <h1>Aşı Ekle</h1>
        <TextField
          required
          className="new-form-textfield"
          id="outlined-required"
          label="Name"
          inputRef={nameRef}
          type="text"
        />

        <TextField
          required
          className="new-form-textfield"
          id="outlined-required"
          label="Species"
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
          className="new-form-select "
          ref={animalRef}
          name="animalId"
          id="title"
        >
          <option>Hayvan İsmi</option>
          {animals?.map((item, index) => (
            <option key={index} value={`${item.id}`}>
              {item.name}
            </option>
          ))}
        </select>

        <select
          className="new-form-select "
          ref={reportRef}
          name="reportId"
          id="title"
        >
          <option>Rapor Tanımı</option>
          {reports?.map((item, index) => (
            <option key={index} value={`${item.id}`}>
              {item.description}
            </option>
          ))}
        </select>

        <Button
          className="add-button"
          onClick={add}
          variant="contained"
          endIcon={<SendIcon />}
        >
          Aşı Ekle
        </Button>
      </form>
    </div>
  );
}

export default CreateVaccineForm;
