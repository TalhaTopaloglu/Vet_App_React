/* eslint-disable react/prop-types */
import { useContext } from "react";
import { AnimalContext } from "../../contexts/AnimalContext";
import { deleteAnimaById } from "../../services/AnimalApi";
import { NavLink } from "react-router-dom";
import { TableCell, TableRow } from "@mui/material";

function AnimalTableRow({id,name,species,breed,gender,colour,dateOfBirth,customer}) {

    const {removeAnimalById} = useContext(AnimalContext);

    async function deleteAnimal() {
        try{
            await deleteAnimaById(id);
            removeAnimalById(id);
        }catch(error){
            console.log(error)
        }
    }
  return (
     <TableRow>
        <TableCell>{name}</TableCell>
        <TableCell>{species}</TableCell>
        <TableCell>{breed}</TableCell>
        <TableCell>{gender}</TableCell>
        <TableCell>{colour}</TableCell>
        <TableCell>{dateOfBirth}</TableCell>
        <TableCell>{customer.name}</TableCell>
        <TableCell>
            <div>
                <NavLink to= {`${id}`} >View</NavLink>
                <NavLink to={`${id}/edit`}>Edit</NavLink>
                <button onClick={deleteAnimal}> Delete</button>
            </div>
        </TableCell>
    </TableRow>
  )
}

export default AnimalTableRow