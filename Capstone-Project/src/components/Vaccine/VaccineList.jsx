import {useContext,useEffect,useState} from 'react'
import { VaccineContext } from '../../contexts/VaccinesContext'
import { getVaccines } from '../../services/VaccineApi'
import { Table, TableBody, TableHead, TableRow, colors} from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles'
import VaccineTableRow from './VaccineTableRow';
import CreateVaccineForm from './CreateVaccineForm';



function VaccineList() {

    const {vaccines, updateVaccines} = useContext(VaccineContext);

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
            const vaccines = await getVaccines();
            updateVaccines(vaccines);
          } catch (error) {
            console.log("Error fetching products: " + error);
          }
        }
        fetchData();
      }, []);


  return (
    <div>
    <div style={{display: "flex" , flexDirection: "row", justifyContent: "space-between", maxWidth: "1400px", alignItems: "center", margin:"auto"}}>
    <h1 style={{textAlign:"center", margin: "50px 0"}}>Aşı Yönetimi</h1>
    <input type="text" />
    </div>
    <Table className="table">
      <TableHead>
        <TableRow >
          <StyledTableCell >İsmi</StyledTableCell>
          <StyledTableCell >Kodu</StyledTableCell>
          <StyledTableCell >Koruyucuk Tarihi Baş.</StyledTableCell>
          <StyledTableCell >Koruyucuk Tarihi Bitiş</StyledTableCell>
          <StyledTableCell >Hayvan İsmi</StyledTableCell>
          <StyledTableCell >İşlemler</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {vaccines?.map((vaccine) => (
          <VaccineTableRow key={vaccine.id} {...vaccine} />
        ))}
      </TableBody>
    </Table>
    <div>
      <CreateVaccineForm />
    </div>
  </div>
  )
}

export default VaccineList