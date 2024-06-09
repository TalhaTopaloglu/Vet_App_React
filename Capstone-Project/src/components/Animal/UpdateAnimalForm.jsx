import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AnimalContext } from "../../contexts/AnimalContext";
import { getAnimalById, updateAnimalById } from "../../services/AnimalApi";
import { CustomerContext } from "../../contexts/CustomerContext";
import { getCustomers } from "../../services/CustomerApi";
function UpdateAnimalForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { animal, updateAnimal } = useContext(AnimalContext);
  const [customerList, setCustomerList] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");

  async function update(target) {
    target.preventDefault();
    
    console.log(animal)
    try {
      await updateAnimalById(id, animal);
      navigate(`/animal/${id}`);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const animal = await getAnimalById(id);
        animal.customerId = animal?.customer?.id || '';  // burası önemli
        const customers = await getCustomers();
        setCustomerList(customers);
        updateAnimal(animal);
        console.log(animal);
        console.log(customerList); 
        setSelectedCustomer(animal.customer || "");
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const handleChange = (event) => {
    const { id, value } = event.target;

    const fieldMap = {
      name: "name",
      species: "species",
      breed: "breed",
      gender: "gender",
      colour: "colour",
      dateOfBirth: "dateOfBirth",
      customer: "customerId",
    };

    if (fieldMap[id]) {
      updateAnimal({ ...animal, [fieldMap[id]]: value });
    }
  };

  return (
    <div>
      <form>
        <div>
          <label htmlFor="name">Name</label>
          <input
            onChange={handleChange}
            value={animal.name || ""}
            type="text"
            id="name"
          />
        </div>
        <div>
          <label htmlFor="speices">Species</label>
          <input
            onChange={handleChange}
            value={animal.species || ""}
            type="text"
            id="species"
          />
        </div>
        <div>
          <label htmlFor="breed">Breed</label>
          <input
            onChange={handleChange}
            value={animal.breed || ""}
            type="text"
            id="breed"
          />
        </div>
        <div>
          <label htmlFor="gender">Gender</label>
          <input
            onChange={handleChange}
            value={animal.gender || ""}
            type="text"
            id="gender"
          />
        </div>
        <div>
          <label htmlFor="colour">Colour</label>
          <input
            onChange={handleChange}
            value={animal.colour || ""}
            type="text"
            id="colour"
          />
        </div>
        <div>
          <label htmlFor="dateOfBirth">Birth Date</label>
          <input
            onChange={handleChange}
            value={animal.dateOfBirth || ""}
            type="date"
            id="dateOfBirth"
          />
        </div>
        <div>
          <label htmlFor="customer">Customer</label>
          <select onChange={handleChange}  name="customer" id="customer">
            <option value={selectedCustomer.id} >{selectedCustomer.name}</option>
            {customerList.map((item, index) => {
              return <option key={index} value={item.id} >
                {item.name}
              </option>;
            })}
          </select>
        </div>

        {/* <div>
          <label htmlFor="customer">Customer</label>
          <input
            onChange={handleChange}
            value={animal?.customer?.name || ""}
            type="text"
            id="customer"
            readOnly
          />
        </div> */}
      </form>
      <button onClick={update} type="submit">
        Update
      </button>
    </div>
  );
}

export default UpdateAnimalForm;
