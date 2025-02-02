import React, { useContext, useEffect } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import { AnimalContext } from "../../contexts/AnimalContext";
import { deleteAnimaById, getAnimalById } from "../../services/AnimalApi";
import { IconButton, Tooltip } from "@mui/material";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function AnimalDetail() {
  const { id } = useParams();
  const { animal, updateAnimal, removeAnimalById } = useContext(AnimalContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const animal = await getAnimalById(id);
        updateAnimal(animal);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  async function deleteAnimal() {
    try {
      await deleteAnimaById(id);
      removeAnimalById(id);
      navigate("/animal");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="detail">
      <div className="detail-page">
        <div className="detail-page-header">
        <NavLink to="/animal"> <ArrowBackIcon />  </NavLink>
          <h1>{animal.name}</h1>
          <h3>Animal</h3>
        </div>
        <div
          style={{ justifyContent: "flex-start" }}
          className="detail-page-content"
        >
          <div className="data-info">
            <h1>
              Bİlgiler
              <hr />
            </h1>
            <h3 className="title">
              Species : <span>{animal.species}</span>
            </h3>
            <h3 className="title">
              Breed : <span>{animal.breed}</span>{" "}
            </h3>
            <h3 className="title">
              Gender : <span>{animal.gender}</span>{" "}
            </h3>
            <h3 className="title">
              Colour : <span>{animal.colour}</span>{" "}
            </h3>
            <h3 className="title">
              Birth Day : <span>{animal.dateOfBirth}</span>{" "}
            </h3>
            <h3 className="title">
              Customer : <span>{animal?.customer?.name}</span>{" "}
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
          <a style={{ border: "none" }} onClick={deleteAnimal}>
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

export default AnimalDetail;
