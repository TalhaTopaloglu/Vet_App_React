import { useContext } from "react";
import { DoctorContext } from "../../contexts/DoctorContext";
import { deleteDoctorById } from "../../services/DoctorApi";
import { NavLink } from "react-router-dom";
import { TableCell, TableRow } from "@mui/material";


function DoctorTableRow({
  id,
  name,
  phone,
  mail,
  address,
  city,
  appointmentList,
  availableDateList,
}) {
  const { removeDoctorById } = useContext(DoctorContext);

  async function deleteDoctor() {
    try {
      await deleteDoctorById(id);
      removeDoctorById(id);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <TableRow>
      <TableCell>{name}</TableCell>
      <TableCell>{mail}</TableCell>
      <TableCell>{address}</TableCell>
      <TableCell>{phone}</TableCell>
      <TableCell>{city}</TableCell>
      {/* <TableCell>{availableDateList?.map((item) => `${item.availableDate}`)}</TableCell> */}
      <TableCell>
        <div>
          <NavLink to={`${id}`}>View</NavLink>
          <NavLink to={`${id}/edit`}>Edit</NavLink>
          <button onClick={deleteDoctor}> Delete</button>
        </div>
      </TableCell>
    </TableRow>
  );
}

export default DoctorTableRow;
