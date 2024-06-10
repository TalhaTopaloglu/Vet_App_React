import { NavLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import PetsIcon from "@mui/icons-material/Pets";

const pages = [
  {
    name: "Home",
    link: "/",
  },
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

function Navbar() { 

  return (
    <AppBar sx={{backgroundColor: "#00695f"}} position="absolute" >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box  sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>
          <PetsIcon sx={{mx:1}}/>
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
              fontFamily: "inherit",
              fontSize: "26px",
            }}
          >
            <NavLink
              style={{
                textDecoration: "none",
                color: "inherit",
                fontWeight: "700",
                justifyContent: "center",
                fontSize: "20px",
                fontFamily: "inherit",
              }}
              to="/"
            >
             Vet App
            </NavLink>
          </Typography>
          </Box>
          <Box>
            {pages.map((item) => {
              return (
                <Button
                  key={item.name}
                  sx={{ my:2 ,ml: 6, alignItems: "center", color: "white" }}
                >
                  <NavLink
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      fontWeight: "700",
                      justifyContent: "center",
                      fontSize: "20px",
                      fontFamily: "inherit",
                    }}
                    to={item.link}
                  >
                    {item.name}
                  </NavLink>
                </Button>
              );
            })}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
