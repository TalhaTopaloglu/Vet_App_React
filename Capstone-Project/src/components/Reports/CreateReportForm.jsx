import { useEffect, useRef, useState,useContext} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReportContext } from "../../contexts/ReportContext";
import { createReport } from "../../services/ReportApi";
import { getAppointmentById } from "../../services/Appointment";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { Alert } from "@mui/material";

function CreateReportForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const descriptionRef = useRef();
  const priceRef = useRef();
  const [appointment, setAppointment] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const appointment = await getAppointmentById(id);
        setAppointment(appointment);
      } catch (error) {
        console.log("Error fetching products: " + error);
      }
    }
    fetchData();
  },[])

  const { addReport } = useContext(ReportContext);
  const [showAlert, setShowAlert] = useState(false);
  const [errorList, setErrorList] = useState([]);

  async function add(target) {
    target.preventDefault();
    try {
      const newReport = {
        description:descriptionRef.current.value === "" ? null:descriptionRef.current.value,
        price: priceRef.current.value,
        appointment_id: id,
      };
      const response = await createReport(newReport);
      if (response === undefined) {
        console.log(response);
        return false;
      } else {
        addReport(response);
        navigate(`/report/${response.id}`);
      }
    } catch (error) {
      setErrorList(error.data);
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
          margin: "100px auto 0 auto",
        }}
      >
        Add Report
      </h1>
      <div className="form-container">
        {showAlert ? (
          errorList?.map((item, index) => {
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
              label="Description"
              inputRef={descriptionRef}
              type="text"
            />

            <TextField
              required
              className="new-form-textfield"
              id="outlined-required"
              label="Price"
              inputRef={priceRef}
              type="text"
            />

            <TextField
              required
              className="new-form-textfield"
              id="outlined-required"
              label="Appointment"
              defaultValue={id}
              type="text"
              disabled
            />

            <Button
              className="add-button"
              style={{ backgroundColor: "#00695f" }}
              onClick={add}
              variant="contained"
              endIcon={<SendIcon />}
            >
              Add New Report
            </Button>
          </form>
        )}
      </div>
    </>
  );
}

export default CreateReportForm;
