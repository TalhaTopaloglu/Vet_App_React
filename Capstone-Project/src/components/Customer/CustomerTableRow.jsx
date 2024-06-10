import { useContext, useEffect } from "react";
import { CustomerContext } from "../../contexts/CustomerContext";
import { deleteCustomerById } from "../../services/CustomerApi";
import { NavLink, useNavigate } from "react-router-dom";
import { TableRow } from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";

function CustomerTableRow({
  id,
  name,
  phone,
  mail,
  address,
  city,
  animalList,
}) {
  const { removeCustomerById } = useContext(CustomerContext);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.body}`]: {
      color: theme.palette.primary,
      backgroundColor: theme.palette.primary,
      fontSize: 22,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  async function deleteCustomer() {
    try {
      await deleteCustomerById(id);
      removeCustomerById(id);
      window.location.reload();
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
          {animalList?.map((item) => `${item.name} `)}
        </StyledTableCell>
        <StyledTableCell>
          <NavLink to={`${id}`}>View</NavLink>
          <NavLink to={`${id}/edit`}>Edit</NavLink>
          <button onClick={deleteCustomer}> Delete</button>
        </StyledTableCell>
      </StyledTableRow>
  );
}

export default CustomerTableRow;
