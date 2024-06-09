import { useEffect } from 'react'
import { useContext } from 'react'
import { AnimalContext } from '../../contexts/AnimalContext';
import { getAnimals } from '../../services/AnimalApi';
import AnimalTableRow from './AnimalTableRow';
import CreateAnimalForm from './CreateAnimalForm';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

function AnimalList() {

  const{animals, updateAnimals} = useContext(AnimalContext);

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

  console.log(animals)
  // <div>
  //     <Table className="table">
  //       <TableHead>
  //         <TableRow >
  //           <TableCell style={{fontSize : 30}}>Name</TableCell>
  //           <TableCell style={{fontSize : 30}}>Mail</TableCell>
  //           <TableCell style={{fontSize : 30}}>Address</TableCell>
  //           <TableCell style={{fontSize : 30}}>Phone</TableCell>
  //           <TableCell style={{fontSize : 30}}>City</TableCell>
  //           <TableCell style={{fontSize : 30}}>Animals</TableCell>
  //           <TableCell style={{fontSize : 30}}>İşlemler</TableCell>
  //         </TableRow>
  //       </TableHead>
  //       <TableBody>
  //         {customers?.map((customer) => (
  //           <CustomerTableRow key={customer.id} {...customer} />
  //         ))}
  //       </TableBody>
  //     </Table>
  //     <div>
  //       <CreateCustomerForm />
  //     </div>
  //   </div>

  return (
    <div>
      <Table className="table">
        <TableHead>
          <TableRow>
            <TableCell style={{fontSize : 30}} >Name</TableCell>
            <TableCell style={{fontSize : 30}} >Species</TableCell>
            <TableCell style={{fontSize : 30}} >Breed</TableCell>
            <TableCell style={{fontSize : 30}} >Gender</TableCell>
            <TableCell style={{fontSize : 30}} >Colour</TableCell>
            <TableCell style={{fontSize : 30}} >Birth Date</TableCell>
            <TableCell style={{fontSize : 30}} >Customer Name</TableCell>
            <TableCell style={{fontSize : 30}}>İşlemler</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {animals?.map(animal => <AnimalTableRow key = {animal.id} {...animal} />)}
        </TableBody>
      </Table>
      <div>
          <CreateAnimalForm />
      </div>
    </div>
  )
}

export default AnimalList