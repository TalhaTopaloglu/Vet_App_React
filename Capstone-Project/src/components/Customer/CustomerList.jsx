import { useContext, useEffect } from "react";
import { CustomerContext } from "../../contexts/CustomerContext";
import { getCustomers } from "../../services/CustomerApi";
import CustomerTableRow from "./CustomerTableRow";
import CreateCustomerForm from "./CreateCustomerForm";
import { Table, TableBody, TableHead, TableRow, colors} from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles'


function CustomerList() {
  const { customers, updateCustomers } = useContext(CustomerContext);

  
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
        const customers = await getCustomers();
        updateCustomers(customers);
      } catch (error) {
        console.log("Error fetching products: " + error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <div style={{display: "flex" , flexDirection: "row", justifyContent: "space-between", maxWidth: "1400px", alignItems: "center", margin:"auto"}}>
      <h1 style={{textAlign:"center", margin: "50px 0"}}>Müşteri Yönetimi</h1>
      <input type="text" />
      </div>
      <Table className="table">
        <TableHead>
          <TableRow >
            <StyledTableCell >Name</StyledTableCell>
            <StyledTableCell >Mail</StyledTableCell>
            <StyledTableCell >Address</StyledTableCell>
            <StyledTableCell >Phone</StyledTableCell>
            <StyledTableCell >City</StyledTableCell>
            <StyledTableCell >Animals</StyledTableCell>
            <StyledTableCell >İşlemler</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers?.map((customer) => (
            <CustomerTableRow key={customer.id} {...customer} />
          ))}
        </TableBody>
      </Table>
      <div>
        <CreateCustomerForm />
      </div>
    </div>
  );
}

export default CustomerList;
