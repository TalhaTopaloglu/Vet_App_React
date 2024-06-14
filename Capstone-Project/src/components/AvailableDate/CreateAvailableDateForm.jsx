import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createAvailableDate,
  getAvailableDates,
} from "../../services/AvailableDateApi";
import { AvailableDateContext } from "../../contexts/AvailableDateContext";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { Alert } from "@mui/material";

function CreateAvailableDateForm({ doctors }) {
  const navigate = useNavigate();
  const availableDateRef = useRef();
  const doctorIdRef = useRef();

  const { addAvailableDate } = useContext(AvailableDateContext);
  // const [availableDateList, setAvailableDateList] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [errorList, setErrorList] = useState([]);

  // useState(() => {
  //   async function fetchData() {
  //     try {
  //       const availableDates = await getAvailableDates();
  //       setAvailableDateList(availableDates);
  //     } catch (error) {
  //       console.log("Error fetching products: " + error);
  //     }
  //   }
  //   fetchData();
  // }, []);

  async function add(target) {
    target.preventDefault();

    try {
      const newAvailableDate = {
        availableDate:
          availableDateRef.current.value === ""
            ? null
            : availableDateRef.current.value,
        doctorId:
          doctorIdRef.current.value === "" ? null : doctorIdRef.current.value,
      };
      console.log(newAvailableDate);
      const response = await createAvailableDate(newAvailableDate);
      console.log(response);
      if (response === undefined) {
        return false;
      } else {
        addAvailableDate(response);
        navigate(`/available-date/${response.id}`);
      }
    } catch (error) {
      if (error === undefined) {
        error = ["Geçerli bir doktor seçiniz!"];
      }
      setErrorList(error);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
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
          margin: "auto",
        }}
      >
        Add Work Day
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
            <TextField
              required
              className="new-form-textfield"
              id="outlined-required"
              inputRef={availableDateRef}
              type="date"
            />
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
            <Button
              className="add-button"
              style={{ backgroundColor: "#00695f" }}
              onClick={add}
              variant="contained"
              endIcon={<SendIcon />}
            >
              Add New Work Day
            </Button>
          </form>
        )}
      </div>
    </>
  );
}

export default CreateAvailableDateForm;
