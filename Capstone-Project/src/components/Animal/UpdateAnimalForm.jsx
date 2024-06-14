import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { AnimalContext } from "../../contexts/AnimalContext";
import { getAnimalById, updateAnimalById } from "../../services/AnimalApi";
import { getCustomers } from "../../services/CustomerApi";
import { Alert, Button } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function UpdateAnimalForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { animal, updateAnimal } = useContext(AnimalContext);
  const [customerList, setCustomerList] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [errorList, setErrorList] = useState([]);

  async function update(target) {
    target.preventDefault();
    try {
      console.log(animal)
      await updateAnimalById(id, animal);
      navigate(`/animal/${id}`);
    } catch (error) {
      console.log(error)
      setErrorList(error.response.data.data);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const animal = await getAnimalById(id);
        animal.customerId = animal?.customer?.id || ""; 
        const customers = await getCustomers();
        setCustomerList(customers);
        updateAnimal(animal);
        setSelectedCustomer(animal.customer || "");
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const handleChange = (event) => {
    const { id, value } = event.target;

    switch(id) {
      case "name":
        updateAnimal({...animal, name: value === "" ? null : value});
        break;
      case "species":
          updateAnimal({...animal, species: value === "" ? null : value});
          break;
      case "breed":
        updateAnimal({...animal, breed: value === "" ? null : value});
        break;
      case "gender":
        updateAnimal({...animal, gender: value === "" ? null : value});
        break;
      }

    const fieldMap = {
      colour: "colour",
      dateOfBirth: "dateOfBirth",
      customer: "customerId",
    };

    if (fieldMap[id]) {
      updateAnimal({ ...animal, [fieldMap[id]]: value === "" ? null : value});
    }
  };

  return (
    <div className="update-form">
      <NavLink to="/animal"> <ArrowBackIcon/></NavLink>
      <h1 style={{ borderBottom: "2px solid #00695f", color: "#00695f" }}>
        Animal Id:{animal?.id}
      </h1>

      {showAlert ? (
        errorList.map((item, index) => {
          return (
            <Alert
              sx={{ width: "40%", margin: "auto", my: 3 }}
              key={index}
              variant="filled"
              severity="error"
            >
              {item}
            </Alert>
          );
        })
      ) : (
        <form>
          <div className="update-form-content">
            <label htmlFor="name">Name</label>
            <input
              onChange={handleChange}
              value={animal.name || ''}
              type="text"
              id="name"
            />
          </div>
          <div className="update-form-content">
            <label htmlFor="species">Species</label>
            <input
              onChange={handleChange}
              value={animal.species || ''}
              type="text"
              id="species"
            />
          </div>
          <div className="update-form-content">
            <label htmlFor="breed">Breed</label>
            <input
              onChange={handleChange}
              value={animal.breed || ''}
              type="text"
              id="breed"
            />
          </div>
          <div className="update-form-content">
            <label htmlFor="address">Gender</label>
            <input
              onChange={handleChange}
              value={animal.gender || ''}
              type="text"
              id="gender"
            />
          </div>
          <div className="update-form-content">
            <label htmlFor="colour">Colour</label>
            <input
              onChange={handleChange}
              value={animal.colour || ''}
              type="text"
              id="colour"
            />
          </div>
          <div className="update-form-content">
            <label htmlFor="dateOfbirth">Date of Birth</label>
            <input
              onChange={handleChange}
              value={animal.dateOfBirth || ''}
              type="date"
              id="dateOfbirth"
            />
          </div>
          <div className="update-form-content">
            <label htmlFor="customer">Customer</label>
            <select onChange={handleChange} name="customer" id="customer">
              <option value={selectedCustomer.id}>
                {selectedCustomer.name}
              </option>
              {customerList.map((item, index) => {
                return (
                  <option key={index} value={item.id}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
        </form>
      )}
      <Button
        sx={{ backgroundColor: "#00695f" }}
        variant="contained"
        onClick={update}
        type="submit"
      >
        Update
      </Button>
    </div>
  );
}

export default UpdateAnimalForm;
