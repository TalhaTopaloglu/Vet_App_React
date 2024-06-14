import {useContext, useEffect, useState} from 'react'
import { AvailableDateContext } from '../../contexts/AvailableDateContext'
import { deleteAvailableDateById } from '../../services/AvailableDateApi'
import { NavLink } from 'react-router-dom'
import { IconButton, TableRow, Tooltip } from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles'
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';



function AvailableTableRow({id, availableDate, doctorId, doctor}) {

  const { removeAvailableDateById } = useContext(AvailableDateContext);

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

  async function deleteAvailableDate() {
    try {
      await deleteAvailableDateById(id);
      removeAvailableDateById(id);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <StyledTableRow>
      <StyledTableCell>{doctor?.name}</StyledTableCell>
      <StyledTableCell> {availableDate}</StyledTableCell>
      <StyledTableCell>
      <NavLink to={`/available-date/${id}`}>
          <Tooltip title="View">
            <IconButton>
              <VisibilityRoundedIcon
                sx={{ color: "#00695f", }}
              />
            </IconButton>
          </Tooltip>
        </NavLink>
        <NavLink to={`/available-date/${id}/edit`}>
          <Tooltip title="Edit">
            <IconButton>
              <ModeEditOutlineRoundedIcon
                sx={{ color: "#00695f"}}
              />
            </IconButton>
          </Tooltip>
        </NavLink>
        <a style={{border:"none"}} onClick={deleteAvailableDate}>
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

export default AvailableTableRow