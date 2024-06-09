import { useContext } from "react"
import { AppointmentContext } from "../../contexts/Appointment"
import { deleteAppointmentById } from "../../services/Appointment"
import { NavLink } from "react-router-dom"
import { TableRow } from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles'
import { FormattedDate } from "../General/FormattedData";


function AppointmentTableRow({id,appointmentDate, doctor, animal}) {
    const { removeAppointmentById } = useContext(AppointmentContext);

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

      async function deleteAppointment() {
        try {
          await deleteAppointmentById(id);
          removeAppointmentById(id);
        } catch (error) {
          console.log(error);
        }
      }




  return (
    <StyledTableRow>
      <StyledTableCell>{<FormattedDate dateString={appointmentDate}/>}</StyledTableCell>
      <StyledTableCell>{doctor?.name}</StyledTableCell>
      <StyledTableCell>{animal?.name}</StyledTableCell>
      <StyledTableCell>
        <NavLink to={`${id}`}>View</NavLink>
        <NavLink to={`${id}/edit`}>Edit</NavLink>
        <button onClick={deleteAppointment}> Delete</button>
      </StyledTableCell>
    </StyledTableRow>
  )
}

export default AppointmentTableRow