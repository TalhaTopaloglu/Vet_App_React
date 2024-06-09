import { useContext, useEffect } from "react";
import { ReportContext } from "../../contexts/ReportContext";
import { getReports } from "../../services/ReportApi";

import { Table, TableBody, TableHead, TableRow, colors } from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import ReportTableRow from "./ReportTableRow";

function ReportList() {
  const { reports, updateReports } = useContext(ReportContext);

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
        const reports = await getReports();
        updateReports(reports);
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
          Rapor Yönetimi
        </h1>
        <input type="text" />
      </div>
      <Table className="table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Tanım</StyledTableCell>
            <StyledTableCell>Ücret</StyledTableCell>
            <StyledTableCell>Hayvan Adı</StyledTableCell>
            <StyledTableCell>Doktor Adı</StyledTableCell>
            <StyledTableCell>Aşı Listesi</StyledTableCell>
            <StyledTableCell>İşlemler</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reports?.map((report) => (
            <ReportTableRow key={report.id} {...report} />
          ))}
        </TableBody>
      </Table>
      <div>{/* <CreateCustomerForm /> */}</div>
    </div>
  );
}

export default ReportList;
