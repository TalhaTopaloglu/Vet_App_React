import { useContext } from "react";
import { ReportContext } from "../../contexts/ReportContext";
import { deleteReportById } from "../../services/ReportApi";
import { NavLink } from "react-router-dom";
import { IconButton, TableRow, Tooltip } from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import NestedList from "../General/NestedList";
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';


function ReportTableRow({ id, description, price, appointment, vaccineList }) {
  const { removeReportById } = useContext(ReportContext);

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
      <StyledTableCell>
        {vaccineList.length > 0 ? <NestedList list={vaccineList} listName={"Vaccine List"}/>: "No vaccine added yet" }
      </StyledTableCell>
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
        <a style={{ border: "none" }} onClick={deleteReport}>
          <Tooltip title="Delete">
            <IconButton>
              <DeleteRoundedIcon sx={{ color: "#00695f" }} />
            </IconButton>
          </Tooltip>
        </a>
        <NavLink to={`/vaccine/${id}/add`}>
          <Tooltip title="Add Vaccine">
            <IconButton>
              <ControlPointRoundedIcon
                sx={{ color: "#00695f"}}
                /> Vaccine
            </IconButton>
          </Tooltip>
        </NavLink>
      </StyledTableCell>
    </StyledTableRow>
  );
}

export default ReportTableRow;
