import { useContext, useEffect, useState } from "react";
import { CustomerContext } from "../../contexts/CustomerContext";
import {
  getCustomersByName,
  getCustomersTotalElement,
  getPageableCustomers,
} from "../../services/CustomerApi";
import CustomerTableRow from "./CustomerTableRow";
import CreateCustomerForm from "./CreateCustomerForm";
import {
  Button,
  Input,
  Table,
  TableBody,
  TableHead,
  TableRow,
  colors,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import Loading from "../General/Loading";

function CustomerList() {
  const { customers, updateCustomers } = useContext(CustomerContext);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [filterByName, setFilterByName] = useState("");

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#00695f",
      color: theme.palette.common.white,
      fontSize: 20,
    },
  }));

  function handleChange(e) {
    setFilterByName(e.target.value);
  }

  function changePage(e) {
    let value = e.target.id;
    setCurrentPage(parseInt(value) - 1);
  }

  useEffect(() => {
    async function fetchData() {
      if (filterByName !== "") {
        try {
          const filterCustomer = await getCustomersByName(filterByName);
          updateCustomers(filterCustomer);
        } catch (error) {
          console.log("Error fetching products: " + error);
        }
      } else {
        try {
          const showPage = await getPageableCustomers(currentPage);
          updateCustomers(showPage);
          setIsLoading(true);
        } catch (error) {
          console.log("Error fetching products: " + error);
        }
      }
    }
    fetchData();
  }, [filterByName]);

  useEffect(() => {
    async function fetchData() {
      try {
        const totalElement = await getCustomersTotalElement();
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
            Customer Managment
          </h1>
          <div>
            <Input
              placeholder="Search Customer Name"
              onChange={handleChange}
              value={filterByName}
              type="text"
            />
          </div>
        </div>
      </div>
      <Table className="table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Mail</StyledTableCell>
            <StyledTableCell>Address</StyledTableCell>
            <StyledTableCell>Phone</StyledTableCell>
            <StyledTableCell>City</StyledTableCell>
            <StyledTableCell>Animal List</StyledTableCell>
            <StyledTableCell>Action</StyledTableCell>
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
      <center style={{ marginTop: "20px" }}>
        {filterByName === "" && pageNumbers?.map((item, index) => (
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
        <CreateCustomerForm />
      </div>
    </div>
  );
}

export default CustomerList;
