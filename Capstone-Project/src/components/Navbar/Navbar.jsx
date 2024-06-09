import { NavLink } from "react-router-dom";
import "../Navbar/navbar.style.css";

function Navbar() {
  return (
    <nav className="navbar">

        <div className="logo">
          <NavLink className="nav-link" to="/">
            Vet APP
          </NavLink>
        </div>
        <div className="navbar-items">
          <ul className="navbar-items-list">
            <li>
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/customer">
                Customers
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/animal">
                Animals
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/doctor">
                Doctors
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/appointment">
                Appointments
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/vaccine">
                Vaccines
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/report">
                Reports
              </NavLink>
            </li>
          </ul>
        </div>
    </nav>
  );
}

export default Navbar;
