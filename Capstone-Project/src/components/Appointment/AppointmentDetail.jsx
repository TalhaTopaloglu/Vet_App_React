import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { IconButton, Tooltip } from "@mui/material";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { deleteAppointmentById, getAppointmentById } from "../../services/Appointment";
import { AppointmentContext } from "../../contexts/Appointment";

function AppointmentDetail() {
  const { id } = useParams();
  const { appointment, updateAppointment, removeAppointmentById } = useContext(AppointmentContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const appointment = await getAppointmentById(id);
        console.log(appointment)
        updateAppointment(appointment);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  async function deleteAppointment() {
    try {
      await deleteAppointmentById(id);
      removeAppointmentById(id);
      navigate("/appointment");
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <div className="detail">
    <div className="detail-page">
      <div className="detail-page-header">
        <h1>{appointment.id}</h1>
        <h3>Appointment</h3>
      </div>
      <div className="detail-page-content">
        <div className="data-info">
          <h1>Info
            <hr />
          </h1>
          <h3 className="title">Date : <span>{appointment?.appointmentDate}</span></h3>
          <h3 className="title">Doctor Id : <span>{appointment?.doctor?.name}</span> </h3>
          <h3 className="title">Animal Id : <span>{appointment?.animal?.name}</span> </h3>
          <h3 className="title">Report Description : <span>{appointment?.report?.description}</span> </h3>
        </div>
      </div>
      <div className="detail-page-footer">
      <NavLink to={`edit`}>
        <Tooltip title="Edit">
          <IconButton>
            <ModeEditOutlineRoundedIcon
              sx={{ color: "#00695f"}}
            />
          </IconButton>
        </Tooltip>
      </NavLink>
      <a style={{border:"none"}} onClick={deleteAppointment}>
        <Tooltip title="Delete">
          <IconButton>
            <DeleteRoundedIcon
              sx={{ color: "#00695f" }}
            />
          </IconButton>
        </Tooltip>
      </a>
      </div>
    </div>
  </div>
  )
}

export default AppointmentDetail