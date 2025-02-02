import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import { DoctorContext } from "../../contexts/DoctorContext";
import { deleteDoctorById, getDoctorsById } from "../../services/DoctorApi";
import { format } from "date-fns";
import { FormattedDate } from "../General/FormattedData";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { IconButton, Tooltip } from "@mui/material";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

function DoctorDetail() {
  const { id } = useParams();
  const [doctorAppointmentList, setDoctorAppointmentList] = useState([]);
  const [doctorAvailableDates, setDoctorAvailableDates] = useState([]);
  const { doctor, updateDoctor, removeDoctorById } = useContext(DoctorContext);
  const navigate = useNavigate();
  const date = new Date();
  const formattedDate = format(date, "MMMM d, yyyy 'at' h:mm a");

  useEffect(() => {
    async function fetchData() {
      try {
        const doctor = await getDoctorsById(id);
        updateDoctor(doctor);
        setDoctorAppointmentList(doctor?.appointmentList);
        setDoctorAvailableDates(doctor?.availableDateList);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  async function deleteDoctor() {
    try {
      await deleteDoctorById(id);
      removeDoctorById(id);
      navigate("/doctor");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="detail">
      <div className="detail-page">
        <div className="detail-page-header">
      <NavLink to="/doctor"> <ArrowBackRoundedIcon/></NavLink>

          <h1>{doctor.name}</h1>
          <h3>Doctor</h3>
        </div>
        <div className="detail-page-content">
          <div className="data-info">
            <h1>
              Bİlgiler
              <hr />
            </h1>
            <h3 className="title">
              Phone : <span>{doctor.phone}</span>
            </h3>
            <h3 className="title">
              Mail : <span>{doctor.mail}</span>{" "}
            </h3>
            <h3 className="title">
              Address : <span>{doctor.address}</span>{" "}
            </h3>
            <h3 className="title">
              City : <span>{doctor.city}</span>{" "}
            </h3>
          </div>
          <div className="data-lists">
            <div className="data-list">
              <h1>Appointment List</h1>
              <hr />
              <ul>
                {doctorAppointmentList?.map((item) => {
                  return (
                    <li key={item.id}>
                      <FormattedDate dateString={item.appointmentDate} />
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="data-list">
              <h1>Available Date List</h1>
              <hr />
              <ul>
                {doctorAvailableDates?.map((item) => {
                  return <li key={item.id}>{item.availableDate}</li>;
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className="detail-page-footer">
          <NavLink to={`edit`}>
            <Tooltip title="Edit">
              <IconButton>
                <ModeEditOutlineRoundedIcon sx={{ color: "#00695f" }} />
              </IconButton>
            </Tooltip>
          </NavLink>
          <a style={{ border: "none" }} onClick={deleteDoctor}>
            <Tooltip title="Delete">
              <IconButton>
                <DeleteRoundedIcon sx={{ color: "#00695f" }} />
              </IconButton>
            </Tooltip>
          </a>
        </div>
      </div>
    </div>
  );
}

export default DoctorDetail;
