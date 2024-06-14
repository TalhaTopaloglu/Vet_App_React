import { useEffect,useState } from 'react'
import { useContext } from 'react'
import { AnimalContext } from '../../contexts/AnimalContext';
import { getAnimals, getAnimalsByCustomerName, getAnimalsByName, getAnimalsTotalElement, getPageableAnimals } from '../../services/AnimalApi';
import AnimalTableRow from './AnimalTableRow';
import CreateAnimalForm from './CreateAnimalForm';
import {
  Button,
  Input,
  Table,
  TableBody,
  TableHead,
  TableRow,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import Loading from "../General/Loading";

function AnimalList() {

  const{animals, updateAnimals} = useContext(AnimalContext);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [filterByCustomerName, setFilterByCustomerName] = useState("");
  const [filterByAnimalName, setFilterByAnimalName] = useState("");

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#00695f",
      color: theme.palette.common.white,
      fontSize: 20,
    },
  }));


  function handleChange(e) {
    setFilterByCustomerName(e.target.value);
  }

  function handleChangePetName(e) {
    setFilterByAnimalName(e.target.value);
  }


  function changePage(e) {
    let value = e.target.id;
    setCurrentPage(parseInt(value) - 1);
  }

  useEffect(() => {
    async function fetchData(){
      try{
        const animals = await getAnimals();
        updateAnimals(animals);
      }catch (error) {
        console.log("Error fetching products: " + error)
      }
    }
    fetchData();
  },[])

  useEffect(() => {
    async function fetchData() {
      if (filterByAnimalName !== "") {
        try {
          const filterAnimal = await getAnimalsByName(filterByAnimalName);
          updateAnimals(filterAnimal);
        } catch (error) {
          console.log("Error fetching products: " + error);
        }
      } else if (filterByCustomerName !== "" ) {
          try {
            const filterAnimal = await getAnimalsByCustomerName(filterByCustomerName);
            updateAnimals(filterAnimal);
          } catch (error) {
            console.log("Error fetching products: " + error);
          }
        }
      else {
        try {
          const showPage = await getPageableAnimals(currentPage);
          updateAnimals(showPage);
          setIsLoading(true);
        } catch (error) {
          console.log("Error fetching products: " + error);
        }
      }
    }
    fetchData();
  }, [filterByAnimalName, filterByCustomerName]);

  useEffect(() => {
    async function fetchData() {
      try {
        const totalElement = await getAnimalsTotalElement();
        let number = Math.ceil(totalElement / 10);
        for (let i = 1; i <= number; i++) {
          pageNumbers.push(i);
        }
      } catch (error) {
        console.log("Error fetching products: " + error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const showPage = await getPageableAnimals(currentPage);
        updateAnimals(showPage);
        setIsLoading(true);
      } catch (error) {
        console.log("Error fetching products: " + error);
      }
    }
    fetchData();
  }, [currentPage]);

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
          Pet Managment
        </h1>
        <div>
            <Input
              placeholder="Search By Customer Name"
              onChange={handleChange}
              value={filterByCustomerName}
              type="text"
            />
          </div>
          <div>
            <Input
              placeholder="Search Pet Name"
              onChange={handleChangePetName}
              value={filterByAnimalName}
              type="text"
            />
          </div>
      </div>
    </div>
    <Table className="table">
      <TableHead>
        <TableRow>
          <StyledTableCell>Name</StyledTableCell>
          <StyledTableCell>Species</StyledTableCell>
          <StyledTableCell>Breed</StyledTableCell>
          <StyledTableCell>Gender</StyledTableCell>
          <StyledTableCell>Colour</StyledTableCell>
          <StyledTableCell>Date of Birth</StyledTableCell>
          <StyledTableCell>Customer Name</StyledTableCell>
          <StyledTableCell>İşlemler</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {!isLoading ? (
          <Loading />
        ) : (
          animals?.map((animal) => (
            <AnimalTableRow key={animal.id} {...animal} />
          ))
        )}
      </TableBody>
    </Table>
    <center style={{ marginTop: "20px" }}>
      {pageNumbers?.map((item, index) => (
        <Button
          style={{ margin: "6px", backgroundColor: "#00695f" }}
          variant="contained"
          onClick={changePage}
          id={item}
          key={index}
        >
          {item}
        </Button>
      ))}
    </center>
    <div>
      <CreateAnimalForm />
    </div>
  </div>

    // <div>
    //   <Table className="table">
    //     <TableHead>
    //       <TableRow>
    //         <TableCell style={{fontSize : 30}} >Name</TableCell>
    //         <TableCell style={{fontSize : 30}} >Species</TableCell>
    //         <TableCell style={{fontSize : 30}} >Breed</TableCell>
    //         <TableCell style={{fontSize : 30}} >Gender</TableCell>
    //         <TableCell style={{fontSize : 30}} >Colour</TableCell>
    //         <TableCell style={{fontSize : 30}} >Birth Date</TableCell>
    //         <TableCell style={{fontSize : 30}} >Customer Name</TableCell>
    //         <TableCell style={{fontSize : 30}}>İşlemler</TableCell>

    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       {animals?.map(animal => <AnimalTableRow key = {animal.id} {...animal} />)}
    //     </TableBody>
    //   </Table>
    //   <div>
    //       <CreateAnimalForm />
    //   </div>
    // </div>
  )
}

export default AnimalList