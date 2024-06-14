import { useContext,useEffect,useState } from 'react'
import { AvailableDateContext } from  "../../contexts/AvailableDateContext";
import { getAvailableDates, getAvailableDatesTotalElement, getPageableAvailableDates } from "../../services/AvailableDateApi";
import { Button, Table, TableBody, TableHead, TableRow, colors} from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles'
import AvailableTableRow from './AvailableTableRow';
import CreateAvailableDateForm from './CreateAvailableDateForm';
import Loading from '../General/Loading';

function AvailableDateList({doctors}) {
const { availableDates ,updadeAvailableDates } = useContext(AvailableDateContext);  const [isLoading, setIsLoading] = useState(false);
const [pageNumbers, setPageNumbers] = useState([]);
const [currentPage, setCurrentPage] = useState(0);

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#00695f",
    color: theme.palette.common.white,
    fontSize: 20,
  },
}));

function changePage(e) {
  let value = e.target.id;
  setCurrentPage(parseInt(value) - 1);
}


useEffect(() => {
  async function fetchData() {
    try {
      const totalElement = await getAvailableDatesTotalElement();
      let number = Math.ceil(totalElement / 10);
      for (let i = 1; i <= number; i++) {
        pageNumbers.push(i);
      }
    } catch (error) {
      console.log("Error fetching products: " + error);
    }
  }
  fetchData();
}, []);

useEffect(() => {
  async function fetchData() {
    try {
      const showPage = await getPageableAvailableDates(currentPage);
      updadeAvailableDates(showPage);
      setIsLoading(true);
    } catch (error) {
      console.log("Error fetching products: " + error);
    }
  }
  fetchData();
}, [currentPage]);



  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          maxWidth: "1400px",
          alignItems: "center",
          margin: "auto",
        }}
      >
        <div
          style={{
            margin: "100px 0 20px 0",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "1400px",
          }}
        >
          <h1
            style={{
              color: "#00695f",
              textAlign: "center",
              textDecoration: "underline",
            }}
          >
            Work Day Managment
          </h1>
        </div>
      </div>
      <Table className="table">
        <TableHead>
          <TableRow >
            <StyledTableCell >Doctor Name</StyledTableCell>
            <StyledTableCell >Date</StyledTableCell>
            <StyledTableCell >Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {!isLoading ? (
            <Loading />
          ) : (
            availableDates?.map((availableDate) => (
              <AvailableTableRow doctor={doctors.find((item) => item.id === availableDate.doctorId)}  key={availableDate.id} {...availableDate} />
            ))
          )}
        </TableBody>
      </Table>
      <center style={{ marginTop: "20px" }}>
        {pageNumbers?.map((item, index) => (
          <Button
            style={{ margin: "6px", backgroundColor: "#00695f" }}
            variant="contained"
            onClick={changePage}
            id={item}
            key={index}
          >
            {item}
          </Button>
        ))}
      </center>
      <div>
        <CreateAvailableDateForm doctors= {doctors} />
      </div>
    </div>
    
  )
}

export default AvailableDateList