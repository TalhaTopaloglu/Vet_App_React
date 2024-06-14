import { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../contexts/DoctorContext";
import { getDoctors, getDoctorsTotalElement, getPageableDoctors } from "../../services/DoctorApi";
import  AvailableDateList from '../AvailableDate/AvailableDateList'
import DoctorTableRow from "./DoctorTableRow";
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
import CreateDoctorForm from "./CreateDoctorForm";

function DoctorList() {
  const { doctors, updateDoctors } = useContext(DoctorContext);
  const [isLoading, setIsLoading] = useState(false);
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
        const totalElement = await getDoctorsTotalElement();
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
        const showPage = await getPageableDoctors(currentPage);
        updateDoctors(showPage);
        setIsLoading(true);
      } catch (error) {
        console.log("Error fetching products: " + error);
      }
    }
    fetchData();
  }, [currentPage]);

  return (
    <>
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
            Doctor Managment
          </h1>
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
            <StyledTableCell>Work Day</StyledTableCell>
            <StyledTableCell>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!isLoading ? (
            <Loading />
          ) : (
            doctors?.map((doctor) => (
              <DoctorTableRow key={doctor.id} {...doctor} />
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
        <CreateDoctorForm />
      </div>
    </div>


      {/* <div>
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
            Doktor Yönetimi
          </h1>
          <input type="text" />
        </div>
        <Table className="table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontSize: 30 }}>Name</TableCell>
              <TableCell style={{ fontSize: 30 }}>Mail</TableCell>
              <TableCell style={{ fontSize: 30 }}>Address</TableCell>
              <TableCell style={{ fontSize: 30 }}>Phone</TableCell>
              <TableCell style={{ fontSize: 30 }}>City</TableCell>
              <TableCell style={{ fontSize: 30 }}>İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {doctors?.map((doctor) => (
              <DoctorTableRow key={doctor.id} {...doctor} />
            ))}
          </TableBody>
        </Table>
        <div>
          <CreateDoctorForm />
        </div>
      </div> */}
      <AvailableDateList doctors = {doctors} />
    </>
  );
}

export default DoctorList;
