import {useContext} from 'react'
import { VaccineContext } from '../../contexts/VaccinesContext'
import { deleteVaccineById } from '../../services/VaccineApi'
import { NavLink } from "react-router-dom";
import { TableRow } from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles'


function VaccineTableRow({
    id,
    name,
    code,
    protectionStartDate,
    protectionFinishDate,
    animal
}) {

    const { removeVaccineById } = useContext(VaccineContext);

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
      [`&.${tableCellClasses.body}`]: {
        color: theme.palette.primary,
        backgroundColor: theme.palette.primary,
        fontSize: 22,
      },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));

      async function deleteVaccine() {
        try {
          await deleteVaccineById(id);
          removeVaccineById(id);
        } catch (error) {
          console.log(error);
        }
      }



  return (

    <StyledTableRow>
      <StyledTableCell>{name}</StyledTableCell>
      <StyledTableCell>{code}</StyledTableCell>
      <StyledTableCell>{protectionStartDate}</StyledTableCell>
      <StyledTableCell>{protectionFinishDate}</StyledTableCell>
      <StyledTableCell>{animal?.name}</StyledTableCell>
      <StyledTableCell>
        <NavLink to={`${id}`}>View</NavLink>
        <NavLink to={`${id}/edit`}>Edit</NavLink>
        <button onClick={deleteVaccine}> Delete</button>
      </StyledTableCell>
    </StyledTableRow>
  )
}

export default VaccineTableRow