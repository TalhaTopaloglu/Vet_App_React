import { useContext } from "react";
import { ReportContext } from "../../contexts/ReportContext";
import { deleteReportById } from "../../services/ReportApi";
import { NavLink } from "react-router-dom";
import { TableRow } from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";

function ReportTableRow({ id, description, price, appointment, vaccineList }) {

  const { removeReportById } = useContext(ReportContext);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.body}`]: {
      color: theme.palette.primary,
      backgroundColor: theme.palette.primary,
      fontSize: 12,
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

  async function deleteReport() {
    try {
      await deleteReportById(id);
      removeReportById(id);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <StyledTableRow>
    <StyledTableCell>{description}</StyledTableCell>
    <StyledTableCell>{price}</StyledTableCell>
    <StyledTableCell>{appointment?.animal?.name}</StyledTableCell>
    <StyledTableCell>{appointment?.doctor?.name}</StyledTableCell>
    <StyledTableCell>{vaccineList?.map((item) => `${item.name} `)}</StyledTableCell>
    <StyledTableCell>
      <NavLink to={`${id}`}>View</NavLink>
      <NavLink to={`${id}/edit`}>Edit</NavLink>
      <button onClick={deleteReport}> Delete</button>
      <NavLink to={`/vaccine/new`}>Aşı Ekle</NavLink>
    </StyledTableCell>
  </StyledTableRow>
);
}

export default ReportTableRow;
