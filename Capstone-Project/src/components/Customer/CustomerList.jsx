import { useContext, useEffect, useState } from "react";
import { CustomerContext } from "../../contexts/CustomerContext";
import {
  deleteCustomerById,
  getCustomers,
  getCustomersTotalElement,
  getPageableCustomers,
} from "../../services/CustomerApi";
import CustomerTableRow from "./CustomerTableRow";
import CreateCustomerForm from "./CreateCustomerForm";
import {
  Button,
  Table,
  TableBody,
  TableHead,
  TableRow,
  colors,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import Loading from "../General/Loading";
import { useNavigate } from "react-router-dom";

function CustomerList() {
  const { customers, updateCustomers,removeCustomerById } = useContext(CustomerContext);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [listLength, setListLength] = useState(0);


  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      fontSize: 34,
    },
  }));

  function changePage(e) {
    let value = e.target.id;
    setCurrentPage(parseInt(value) - 1);
    console.log(customers)
  }



  useEffect(() => {
    async function fetchData(){
      try{
        const totalElement = await getCustomersTotalElement();
        let number = Math.ceil(totalElement / 10);
        for (let i = 1; i <= number; i++){
          pageNumbers.push(i);
        }
      }catch (error) {
        console.log("Error fetching products: " + error);
      }
    }
    fetchData();
    }, [])


  useEffect(() => {
    async function fetchData() {
      try {
        const showPage = await getPageableCustomers(currentPage);
        updateCustomers(showPage);
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
        <h1 style={{ textAlign: "center", margin: "50px 0" }}>
          Müşteri Yönetimi
        </h1>
        <input type="text" />
      </div>
      <Table className="table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Mail</StyledTableCell>
            <StyledTableCell>Address</StyledTableCell>
            <StyledTableCell>Phone</StyledTableCell>
            <StyledTableCell>City</StyledTableCell>
            <StyledTableCell>Animals</StyledTableCell>
            <StyledTableCell>İşlemler</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!isLoading ? (
            <Loading />
          ) : (
            customers?.map((customer) => (
              <CustomerTableRow key={customer.id} {...customer} />
            ))
          )}
        </TableBody>
      </Table>
      <center style={{marginTop: "20px"}}>
        {pageNumbers?.map((item, index) => (
          <Button  style={{margin: "6px"}} variant="contained" onClick={changePage}  id={item} key={index}>
            {item}
          </Button>
        ))}
      </center>
      <div>
        <CreateCustomerForm />
      </div>
      
    </div>
  );
}

export default CustomerList;
