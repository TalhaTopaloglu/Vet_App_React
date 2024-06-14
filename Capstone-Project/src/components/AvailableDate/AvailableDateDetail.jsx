import React from 'react'
import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { AvailableDateContext } from "../../contexts/AvailableDateContext";
import { IconButton, Tooltip } from "@mui/material";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { deleteAvailableDateById, getAvailableDateById } from '../../services/AvailableDateApi';
import { getDoctorsById } from '../../services/DoctorApi';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

function AvailableDateDetail() {

  const {id} = useParams();
  const { availableDate, updateAvailableDate, removeAvailableDateById } = useContext(AvailableDateContext);
  const [doctor, setDoctor] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const availableDate = await getAvailableDateById(id);
        updateAvailableDate(availableDate);
        const availableDateDoctor = await getDoctorsById(availableDate?.doctorId);
        setDoctor(availableDateDoctor);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  async function deleteAvailableDate() {
    try {
      await deleteAvailableDateById(id);
      removeAvailableDateById(id);
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

        <h1>Work Day ID: {availableDate?.id}</h1>
        <h3>Work Day</h3>
      </div>
      <div className="detail-page-content">
        <div className="data-info">
          <h1>Info
            <hr />
          </h1>
          <h3 className="title">Date : <span>{availableDate?.availableDate}</span></h3>
          <h3 className="title">Doctor : <span>{doctor?.name}</span> </h3>
        </div>
      </div>
      <div className="detail-page-footer">
      <a style={{border:"none"}} onClick={deleteAvailableDate}>
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

export default AvailableDateDetail