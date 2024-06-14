import { useContext } from "react";
import { VaccineContext } from "../../contexts/VaccinesContext";
import { deleteVaccineById } from "../../services/VaccineApi";
import { NavLink } from "react-router-dom";
import { TableRow } from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import { IconButton,Tooltip } from "@mui/material";
import { FormattedDate } from "../General/FormattedData";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';

function VaccineTableRow({
  id,
  name,
  code,
  protectionStartDate,
  protectionFinishDate,
  animal,
}) {
  const { removeVaccineById } = useContext(VaccineContext);

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
        <NavLink to={`${id}`}>
          <Tooltip title="View">
            <IconButton>
              <VisibilityRoundedIcon sx={{ color: "#00695f" }} />
            </IconButton>
          </Tooltip>
        </NavLink>
        <NavLink to={`${id}/edit`}>
          <Tooltip title="Edit">
            <IconButton>
              <ModeEditOutlineRoundedIcon sx={{ color: "#00695f" }} />
            </IconButton>
          </Tooltip>
        </NavLink>
        <a style={{ border: "none" }} onClick={deleteVaccine}>
          <Tooltip title="Delete">
            <IconButton>
              <DeleteRoundedIcon sx={{ color: "#00695f" }} />
            </IconButton>
          </Tooltip>
        </a>
      </StyledTableCell>
    </StyledTableRow>
  );
}

export default VaccineTableRow;
