import { useContext, useEffect, useState } from "react";
import { VaccineContext } from "../../contexts/VaccinesContext";
import {
  getVaccines,
  getVaccinesByAnimalId,
  getVaccinesByProtectionDate,
} from "../../services/VaccineApi";
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableHead,
  TableRow,
  colors,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import VaccineTableRow from "./VaccineTableRow";
import { getAnimals } from "../../services/AnimalApi";
import Loading from "../General/Loading";

function VaccineList() {
  const { vaccines, updateVaccines } = useContext(VaccineContext);
  const [animals, setAnimals] = useState([]);
  const [animalId, setAnimalId] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#00695f",
      color: theme.palette.common.white,
      fontSize: 20,
    },
  }));

  useEffect(() => {
    async function fetchData() {
      if (animalId === "" || animalId === undefined) {
        try {
          const vaccines = await getVaccines();
          updateVaccines(vaccines);
          const animals = await getAnimals();
          setAnimals(animals);
          setIsLoading(true);
        } catch (error) {
          console.log("Error fetching products: " + error);
        }
      } else
        try {
          const vaccines = await getVaccinesByAnimalId(animalId);
          updateVaccines(vaccines);
        } catch (error) {
          console.log("Error fetching products: " + error);
        }
    }
    fetchData();
  }, [animalId]);

  const handleChange = (event) => {
    setAnimalId(event.target.value);
  };

  const resetSearch = () => {
    async function reset() {
      try {
        const vaccines = await getVaccines();
        updateVaccines(vaccines);
        setIsLoading(true);
      } catch (error) {
        console.log("Error fetching products: " + error);
      }
    }
    reset();
  };

  const dateHandleChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;
    switch (name) {
      case "startDateInput":
        setStartDate(value);
        break;
      case "endDateInput":
        setEndDate(value);
        break;
      default:
        break;
    }
  };

  async function filterVaccine(startDate, endDate) {
    try {
      const filterVaccine = await getVaccinesByProtectionDate(
        startDate,
        endDate
      );
      updateVaccines(filterVaccine);
    } catch (error) {
      console.log(error);
    }
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
            alignItems: "center",
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
            Vaccine Managment
          </h1>

          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            
            <InputLabel id="demo-simple-select-standard-label">
              Pet Name
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={animalId || ""}
              onChange={handleChange}
              label="Pet Name"
            >
              <MenuItem value="">
                <em>Reset Search</em>
              </MenuItem>
              {animals.map((item, index) => (
                <MenuItem key={index} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <p style={{ fontWeight: "800", marginRight: "10px" }}>
              {" "}
              Search By Protection End Date:{" "}
            </p>
            <Input
              name="startDateInput"
              onChange={dateHandleChange}
              value={startDate || ""}
              type="date"
              required

            />
            <Input
              name="endDateInput"
              onChange={dateHandleChange}
              value={endDate || ""}
              type="date"
              required
            />
            <Button
              variant="contained"
              sx={{ backgroundColor: "#00695f", m: 2 }}
              onClick={() => filterVaccine(startDate, endDate)}
            >
              Search
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#00695f" }}
              onClick={resetSearch}
            >
              {" "}
              Reset Search{" "}
            </Button>
            <br />
          </div>
        </div>
      </div>
      <Table className="table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Code</StyledTableCell>
            <StyledTableCell>Protection Start Date</StyledTableCell>
            <StyledTableCell>Protection End Date</StyledTableCell>
            <StyledTableCell>Pet Name</StyledTableCell>
            <StyledTableCell>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!isLoading ? (
            <Loading />
          ) : (
            vaccines?.map((vaccine) => (
              <VaccineTableRow key={vaccine.id} {...vaccine} />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default VaccineList;
