import { useContext } from "react"
import { AppointmentContext } from "../../contexts/Appointment"
import { deleteAppointmentById } from "../../services/Appointment"
import { NavLink } from "react-router-dom"
import { TableRow } from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles'
import { IconButton,Tooltip } from "@mui/material";
import { FormattedDate } from "../General/FormattedData";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';


function AppointmentTableRow({id,appointmentDate, doctor, animal,report}) {
    const { removeAppointmentById } = useContext(AppointmentContext);

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
      [`&.${tableCellClasses.body}`]: {
        color: theme.palette.primary,
        backgroundColor: theme.palette.primary,
        fontSize: 16,
        padding: 10,
        fontWeight: 700
      },
    }));
  
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
      "&:last-child td, &:last-child th": {
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
      <StyledTableCell>{report?.description !== undefined ? report?.description :
        <NavLink to={`/report/${id}/add`}>
          <Tooltip title="Add Report">
            <IconButton>
              <ControlPointRoundedIcon
                sx={{ color: "#00695f"}}
                /> Report
            </IconButton>
          </Tooltip>
        </NavLink>}</StyledTableCell>
      <StyledTableCell>
      <NavLink to={`${id}`}>
          <Tooltip title="View">
            <IconButton>
              <VisibilityRoundedIcon
                sx={{ color: "#00695f", }}
              />
            </IconButton>
          </Tooltip>
        </NavLink>
        <NavLink to={`${id}/edit`}>
          <Tooltip title="Edit">
            <IconButton>
              <ModeEditOutlineRoundedIcon
                sx={{ color: "#00695f"}}
              />
            </IconButton>
          </Tooltip>
        </NavLink>
        <a style={{border:"none"}} onClick={deleteAppointment}>
          <Tooltip title="Delete">
            <IconButton>
              <DeleteRoundedIcon
                sx={{ color: "#00695f" }}
              />
            </IconButton>
          </Tooltip>
        </a>
      </StyledTableCell>
    </StyledTableRow>
  )
}

export default AppointmentTableRow