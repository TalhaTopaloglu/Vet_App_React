import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimalContext } from "../../contexts/AnimalContext";
import { createAnimal } from "../../services/AnimalApi";
import { getCustomers, getCustomerById } from "../../services/CustomerApi";
import { Alert, Button, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

function CreateAnimalForm() {
  const [customerList, setCustomerList] = useState([]);
  const { addAnimal } = useContext(AnimalContext);
  const [showAlert, setShowAlert] = useState(false);
  const [errorList, setErrorList] = useState([]);

  useState(() => {
    async function fetchData() {
      try {
        const customers = await getCustomers();
        console.log(customers)
        setCustomerList(customers);
        } catch (error) {
        console.log("Error fetching products: " + error);
      }
    }
    fetchData();
  }, []);

  const navigate = useNavigate();
  const animalNameRef = useRef();
  const speciesRef = useRef();
  const breedRef = useRef();
  const genderRef = useRef();
  const colourRef = useRef();
  const dateOfBirthRef = useRef();
  const customerRef = useRef();


  async function add(target) {
    target.preventDefault();

    try {
      const newAnimal = {
        name:animalNameRef.current.value === "" ? null: animalNameRef.current.value,
        species:speciesRef.current.value === "" ? null : speciesRef.current.value,
        breed: breedRef.current.value === "" ? null : breedRef.current.value,
        gender: genderRef.current.value === "" ? null : genderRef.current.value,
        colour: colourRef.current.value === "" ? null : colourRef.current.value,
        dateOfBirth:dateOfBirthRef.current.value === "" ? null: dateOfBirthRef.current.value,
        customerId: customerRef.current.value === "" ? null : customerRef.current.value,
      };
      console.log(newAnimal);
      const response = await createAnimal(newAnimal);
      console.log(response);
      if (response === undefined) {
        setErrorList(["Already Exist"]);
        setShowAlert(true)
        setTimeout(() => {
        setShowAlert(false)
      },2000)
        return false;
      } else {
        addAnimal(response);
        navigate(`/animal/${response.id}`);
      }
    } catch (error) {
      if(error === undefined){
        error = ["Geçerli bir müşteri giriniz"];
      }
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
          Add Pet
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
          inputRef={animalNameRef}
          type="text"
        />

        <TextField
          required
          className="new-form-textfield"
          id="outlined-required"
          label="Species"
          inputRef={speciesRef}
          type="text"
        />

        <TextField
          required
          className="new-form-textfield"
          id="outlined-required"
          label="Breed"
          inputRef={breedRef}
          type="text"
        />

        <TextField
          required
          className="new-form-textfield"
          id="outlined-required"
          label="Gender"
          inputRef={genderRef}
          type="text"
        />

        <TextField
          required
          className="new-form-textfield"
          id="outlined-required"
          label="Colour"
          inputRef={colourRef}
          type="text"
        />

        <TextField
          required
          className="new-form-textfield"
          id="outlined-required"
          inputRef={dateOfBirthRef}
          type="date"
        />
        
          <select className="new-form-select " ref={customerRef} name="customerId" id="title">
            <option >Customer Name</option>
            {customerList?.map((item, index) => (
              <option key={index} value={`${item.id}`}>
                {item.name}
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
          Add New Animal
        </Button>
        
      </form>}
    </div>
    </>
  );
}

export default CreateAnimalForm;
