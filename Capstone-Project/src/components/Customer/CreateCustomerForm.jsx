import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCustomer } from "../../services/CustomerApi";
import { CustomerContext } from "../../contexts/CustomerContext";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { Alert } from "@mui/material";

function CreateCustomerForm() {
  
  const navigate = useNavigate();
  const nameRef = useRef();
  const phoneRef = useRef();
  const mailRef = useRef();
  const addressRef = useRef();
  const cityRef = useRef();

  const { addCustomer } = useContext(CustomerContext);
  const [showAlert, setShowAlert] = useState(false);
  const [errorList, setErrorList] = useState([]);

  async function add(target) {
    target.preventDefault();

    try {
      const newCustomer = {
        name: nameRef.current.value === "" ? null : nameRef.current.value,
        phone: phoneRef.current.value === "" ? null : phoneRef.current.value,
        mail: mailRef.current.value === "" ? null : mailRef.current.value,
        address:addressRef.current.value === "" ? null : addressRef.current.value,
        city: cityRef.current.value === "" ? null : cityRef.current.value,
      };
      console.log(newCustomer);
      const response = await createCustomer(newCustomer);
      if (response === undefined) {
        setErrorList(["Already Exist"]);
        setShowAlert(true)
        setTimeout(() => {
        setShowAlert(false)
      },2000)
        return false;
      } else {
        addCustomer(response);
        navigate(`/customer/${response.id}`);
      }
    } catch (error) {
      console.log(error)
      setErrorList(error);
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
            margin: "auto"
          }}
        >
          Add Customer
        </h1>
    <div className="form-container">
      {showAlert ? (
        errorList.map((item,index) =>{
         return <Alert sx={{width: "40%", margin:"auto", mt:3}} key={index}  variant="filled" severity="error">{item}</Alert>
        })): 
      <form className="add-new-form">
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
          label="Phone"
          inputRef={phoneRef}
          type="text"
        />

        <TextField
          required
          className="new-form-textfield"
          id="outlined-required"
          label="Mail"
          inputRef={mailRef}
          type="mail"
        />

        <TextField
          required
          className="new-form-textfield"
          id="outlined-required"
          label="Address"
          inputRef={addressRef}
          type="text"
        />

        <TextField
          required
          className="new-form-textfield"
          id="outlined-required"
          label="City"
          inputRef={cityRef}
          type="text"
        />
        <Button
          className="add-button"
          style={{ backgroundColor: "#00695f" }}
          onClick={add}
          variant="contained"
          endIcon={<SendIcon />}
        >
          Add New Customer
        </Button>
      </form>}
    </div>
  </>
  );
}

export default CreateCustomerForm;
