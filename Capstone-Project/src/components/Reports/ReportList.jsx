import { useContext, useEffect, useState } from "react";
import { ReportContext } from "../../contexts/ReportContext";
import { getPageableReports, getReportsTotalElement } from "../../services/ReportApi";
import {
  Button,
  Table,
  TableBody,
  TableHead,
  TableRow,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import Loading from "../General/Loading";
import ReportTableRow from "./ReportTableRow";

function ReportList() {
  const { reports, updateReports } = useContext(ReportContext);
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
      try {
        const showPage = await getPageableReports(currentPage);
        updateReports(showPage);
        setIsLoading(true);
      } catch (error) {
        console.log("Error fetching products: " + error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const totalElement = await getReportsTotalElement();
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
        const showPage = await getPageableReports(currentPage);
        updateReports(showPage);
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
          Report Managment
        </h1>
      </div>
    </div>
      <Table className="table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Description</StyledTableCell>
            <StyledTableCell>Price</StyledTableCell>
            <StyledTableCell>Pet Name</StyledTableCell>
            <StyledTableCell>Doctor Name</StyledTableCell>
            <StyledTableCell>Vaccine List</StyledTableCell>
            <StyledTableCell>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {!isLoading ? (
            <Loading />
          ) : (
            reports?.map((report) => (
              <ReportTableRow key={report.id} {...report} />
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
    </div>
  );
}

export default ReportList;
