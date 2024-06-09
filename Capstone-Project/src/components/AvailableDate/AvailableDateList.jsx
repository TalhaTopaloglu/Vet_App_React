import React, { useContext,useEffect } from 'react'
import { AvailableDateContext } from  "../../contexts/AvailableDateContext";
import { getAvailableDates } from "../../services/AvailableDateApi";
import { Table, TableBody, TableHead, TableRow, colors} from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles'
import AvailableTableRow from './AvailableTableRow';
import CreateAvailableDateForm from './CreateAvailableDateForm';

function AvailableDateList({doctors}) {
const { availableDates ,updadeAvailableDates } = useContext(AvailableDateContext)

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontSize: 34,
  }
}));

useEffect(() => {
  async function fetchData() {
    try {
      const availableDates = await getAvailableDates();
      updadeAvailableDates(availableDates);
    } catch (error) {
      console.log("Error fetching products: " + error);
    }
  }
  fetchData();
}, []);



  return (
    <div>
      <div style={{display: "flex" , flexDirection: "row", justifyContent: "space-between", maxWidth: "1400px", alignItems: "center", margin:"auto"}}>
      <h1 style={{textAlign:"center", margin: "50px 0"}}>Available Date Yönetimi</h1>
      <input type="text" />
      </div>
      <Table className="table">
        <TableHead>
          <TableRow >
            <StyledTableCell >Doctor Name</StyledTableCell>
            <StyledTableCell >Date</StyledTableCell>
            <StyledTableCell >İşlemler</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {availableDates?.map((availableDate) => (
            <AvailableTableRow doctor={doctors.find((item) => item.id === availableDate.doctorId)} key={availableDate.id} {...availableDate} />
          ))}
        </TableBody>
      </Table>
      <div>
        <CreateAvailableDateForm doctors= {doctors} />
      </div>
    </div>
    
  )
}

export default AvailableDateList