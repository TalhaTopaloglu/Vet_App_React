import { useContext } from "react";
import { AnimalContext } from "../../contexts/AnimalContext";
import { deleteAnimaById } from "../../services/AnimalApi";
import { styled } from "@mui/material/styles";
import { NavLink } from "react-router-dom";
import { TableCell, TableRow, tableCellClasses } from "@mui/material";
import { IconButton, Tooltip } from "@mui/material";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";

function AnimalTableRow({
  id,
  name,
  species,
  breed,
  gender,
  colour,
  dateOfBirth,
  customer,
}) {
    
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.body}`]: {
      color: theme.palette.primary,
      backgroundColor: theme.palette.primary,
      fontSize: 16,
      padding: 10,
      fontWeight: 700,
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

  const { removeAnimalById } = useContext(AnimalContext);

  async function deleteAnimal() {
    try {
      await deleteAnimaById(id);
      removeAnimalById(id);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <StyledTableRow>
      <StyledTableCell>{name}</StyledTableCell>
      <StyledTableCell>{species}</StyledTableCell>
      <StyledTableCell>{breed}</StyledTableCell>
      <StyledTableCell>{gender}</StyledTableCell>
      <StyledTableCell>{colour}</StyledTableCell>
      <StyledTableCell>{dateOfBirth}</StyledTableCell>
      <StyledTableCell>{customer.name}</StyledTableCell>
      
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
        <a style={{ border: "none" }} onClick={deleteAnimal}>
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

export default AnimalTableRow;
