import { useContext, useEffect } from "react";
import { AppointmentContext } from "../../contexts/Appointment";
import { getAppointments } from "../../services/Appointment";
import { Table, TableBody, TableHead, TableRow, colors } from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import AppointmentTableRow from "./AppointmentTableRow";
import CreateAppointmentForm from "./CreateAppointmentForm";

function AppointmentList() {
  const { appointments, updateAppointments } = useContext(AppointmentContext);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      fontSize: 34,
    },
  }));

  useEffect(() => {
    async function fetchData() {
      try {
        const appointments = await getAppointments();
        updateAppointments(appointments);
      } catch (error) {
        console.log("Error fetching products: " + error);
      }
    }
    fetchData();
  }, []);

 

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
          Randevu Yönetimi
        </h1>
        <input type="text" />
      </div>
      <Table className="table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Tarih</StyledTableCell>
            <StyledTableCell>Doktor</StyledTableCell>
            <StyledTableCell>Hayvan</StyledTableCell>
            <StyledTableCell>İşlemler</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments?.map((appointment) => (
            <AppointmentTableRow key={appointment.id} {...appointment} />
          ))}
        </TableBody>
      </Table>
      <div>
        <CreateAppointmentForm />
      </div>
    </div>
  );
}

export default AppointmentList;
