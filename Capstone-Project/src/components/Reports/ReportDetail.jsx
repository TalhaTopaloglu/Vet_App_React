import React, { useContext, useState,useEffect } from 'react'
import { ReportContext } from "../../contexts/ReportContext";
import { useNavigate, useParams,NavLink } from 'react-router-dom';
import {deleteReportById,getReportById} from "../../services/ReportApi"
import { IconButton, Tooltip } from "@mui/material";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

function ReportDetail() {

  const { id } = useParams();
  const { report, updateReport, removeReportById } = useContext(ReportContext)
  const [reportVaccineList, setReportVaccineList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const report = await getReportById(id);
        updateReport(report);
        setReportVaccineList(report?.vaccineList);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  async function deleteReport() {
    try {
      await deleteReportById(id);
      removeReportById(id);
      navigate("/customer");
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className="detail">
    <div className="detail-page">
      <div className="detail-page-header">
        <h1>{report.id}</h1>
        <h3>Report</h3>
      </div>
      <div className="detail-page-content">
        <div className="data-info">
          <h1>Info
            <hr />
          </h1>
          <h3 className="title">Description : <span>{report.description}</span></h3>
          <h3 className="title">Price : <span>{report.price}</span> </h3>
          <h3 className="title">Appointment ID : <span>{report?.appointment?.id}</span> </h3>
        </div>
        <div className="data-lists">
          <h1>Vaccine List</h1>
          <hr />
          <ul>
            {reportVaccineList?.map((item) => {
              return <li key={item.id}>{item.name}</li>;
            })}
          </ul>
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
      <a style={{border:"none"}} onClick={deleteReport}>
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

export default ReportDetail