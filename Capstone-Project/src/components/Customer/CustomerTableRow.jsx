import { useContext, useEffect } from "react";
import { CustomerContext } from "../../contexts/CustomerContext";
import { deleteCustomerById } from "../../services/CustomerApi";
import { NavLink, useNavigate } from "react-router-dom";
import { IconButton, TableRow, Tooltip } from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import NestedList from "../General/NestedList";
function CustomerTableRow({
  id,
  name,
  phone,
  mail,
  address,
  city,
  animalList
}) {
  const { removeCustomerById } = useContext(CustomerContext);


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

  async function deleteCustomer() {
    try {
      await deleteCustomerById(id);
      removeCustomerById(id);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <StyledTableRow>
      <StyledTableCell> {name}</StyledTableCell>
      <StyledTableCell>{mail}</StyledTableCell>
      <StyledTableCell>{address}</StyledTableCell>
      <StyledTableCell>{phone}</StyledTableCell>
      <StyledTableCell>{city}</StyledTableCell>
      <StyledTableCell>
        {animalList.length > 0 ? <NestedList list={animalList} listName={"Animal List"}/>: "No animal added yet" }
      </StyledTableCell>
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
        <a style={{border:"none"}} onClick={deleteCustomer}>
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
  );
}

export default CustomerTableRow;
