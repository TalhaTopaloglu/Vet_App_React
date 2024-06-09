import { useContext, useRef,useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAvailableDate, getAvailableDates } from "../../services/AvailableDateApi";
import { AvailableDateContext } from "../../contexts/AvailableDateContext";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

function CreateAvailableDateForm({doctors}) {
  const [availableDateList, setAvailableDateList] = useState([]);
  const {addAvailableDate} = useContext(AvailableDateContext);


  useState(() => {
    async function fetchData() {
      try {
        const availableDates = await getAvailableDates();
        setAvailableDateList(availableDates);
      } catch (error) {
        console.log("Error fetching products: " + error);
      }
    }
    fetchData();
  }, []);

  const navigate = useNavigate();
  const availableDateRef = useRef();
  const doctorIdRef = useRef();

  async function add(target) {
    target.preventDefault();

    try {
      const newAvailableDate = {
        availableDate:availableDateRef.current.value === "" ? null: availableDateRef.current.value,
        doctorId:doctorIdRef.current.value === "" ? null : doctorIdRef.current.value,
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
      console.log(error);
    }
  }

  return (
    <div className="form-container">
      <form className="add-new-form">
        <TextField
          required
          className="new-form-textfield"
          id="outlined-required"
          inputRef={availableDateRef}
          type="date"
        />
        <select className="new-form-select" ref={doctorIdRef} name="doctorId" id="title">
            <option >Doktor Adı</option>
            {doctors?.map((item, index) => (
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
          Çalışma Günü Ekle
        </Button>
      </form>
    </div>
  );
}

export default CreateAvailableDateForm;
