import { Box, Button } from "@mui/material";
import React from "react";
import "./home.style.css";
import { NavLink } from "react-router-dom";

const pages = [
  {
    name: "Customer",
    link: "/customer",
  },
  {
    name: "Pet",
    link: "/animal",
  },
  {
    name: "Doctor",
    link: "/doctor",
  },
  {
    name: "Appointment",
    link: "/appointment",
  },
  {
    name: "Report",
    link: "/report",
  },
  {
    name: "Vaccine",
    link: "/vaccine",
  },
];

function Home() {
  return (
    <div className="bg-image">
      <div className="welcome">
        <h1>Welcome to Vet App</h1>
      </div>
      <div className="buttons">
         {pages.map((item) => {
            return (
              <Button variant="contained" key={item.name}>
                <NavLink 
                style={{
                      textDecoration: "none",
                      color: "inherit",
                      fontWeight: "700",
                      justifyContent: "center",
                    }}
                to={item.link}>{item.name}</NavLink>
              </Button>
            );
          })}
      </div>
    </div>
  );
}

export default Home;
