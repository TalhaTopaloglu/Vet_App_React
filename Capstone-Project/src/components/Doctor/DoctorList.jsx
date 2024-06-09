import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../contexts/DoctorContext";
import { getDoctors } from "../../services/DoctorApi";
import  AvailableDateList from '../AvailableDate/AvailableDateList'

import DoctorTableRow from "./DoctorTableRow";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import CreateDoctorForm from "./CreateDoctorForm";

function DoctorList() {
  const { doctors, updateDoctors } = useContext(DoctorContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const doctors = await getDoctors();
        updateDoctors(doctors);
      } catch (error) {
        console.log("Error fetching products: " + error);
      }
    }
    fetchData();
  }, []);

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
      </div>
      <AvailableDateList doctors = {doctors} />
    </>
  );
}

export default DoctorList;
