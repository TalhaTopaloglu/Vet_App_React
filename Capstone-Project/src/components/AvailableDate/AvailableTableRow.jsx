import {useContext, useEffect, useState} from 'react'
import { AvailableDateContext } from '../../contexts/AvailableDateContext'
import { deleteAvailableDateById } from '../../services/AvailableDateApi'
import { getDoctorsById  } from '../../services/DoctorApi'
import { NavLink } from 'react-router-dom'
import { TableRow } from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles'



function AvailableTableRow({id, availableDate, doctorId, doctor}) {

  const { removeAvailableDateById } = useContext(AvailableDateContext);

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
        <NavLink to={`/available-date/${id}`}>View</NavLink>
        <NavLink to={`/available-date/${id}/edit`}>Edit</NavLink>
        <button onClick={deleteAvailableDate}> Delete</button>
      </StyledTableCell>
    </StyledTableRow>
  )
}

export default AvailableTableRow