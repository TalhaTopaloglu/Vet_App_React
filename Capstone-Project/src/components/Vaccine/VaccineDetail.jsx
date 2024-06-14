import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { IconButton, Tooltip } from "@mui/material";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { VaccineContext } from "../../contexts/VaccinesContext";
import { deleteVaccineById, getVaccineById } from "../../services/VaccineApi";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

function VaccineDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { vaccine, updateVaccine, removeVaccineById } =
    useContext(VaccineContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const vaccine = await getVaccineById(id);
        updateVaccine(vaccine);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  async function deleteVaccine() {
    try {
      await deleteVaccineById(id);
      removeVaccineById(id);
      navigate("/vaccine");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="detail">
      <div className="detail-page">
        <div className="detail-page-header">
          <NavLink to="/vaccine">
            <ArrowBackRoundedIcon />
          </NavLink>

          <h1>{vaccine.name}</h1>
          <h3>Vaccine</h3>
        </div>
        <div className="detail-page-content">
          <div className="data-info">
            <h1>
              Info
              <hr />
            </h1>
            <h3 className="title">
              Code : <span>{vaccine.code}</span>
            </h3>
            <h3 className="title">
              Protection Start Date : <span>{vaccine.protectionStartDate}</span>{" "}
            </h3>
            <h3 className="title">
              Protection End Date : <span>{vaccine.protectionFinishDate}</span>{" "}
            </h3>
            <h3 className="title">
              Pet Name : <span>{vaccine?.animal?.name}</span>{" "}
            </h3>
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
          <a style={{ border: "none" }} onClick={deleteVaccine}>
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

export default VaccineDetail;
