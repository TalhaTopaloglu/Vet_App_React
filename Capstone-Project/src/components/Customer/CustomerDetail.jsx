import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { CustomerContext } from "../../contexts/CustomerContext";
import {
  deleteCustomerById,
  getCustomerById,
} from "../../services/CustomerApi";
import { IconButton, Tooltip } from "@mui/material";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

function CustomerDetail() {
  const { id } = useParams();
  const [customerAnimalList, setCustomerAnimalList] = useState([]);
  const { customer, updateCustomer, removeCustomerById } =useContext(CustomerContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const customer = await getCustomerById(id);
        updateCustomer(customer);
        setCustomerAnimalList(customer.animalList);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  async function deleteCustomer() {
    try {
      await deleteCustomerById(id);
      removeCustomerById(id);
      navigate("/customer");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="detail">
      <div className="detail-page">
        <div className="detail-page-header">
      <NavLink to="/customer"> <ArrowBackRoundedIcon/></NavLink>

          <h1>{customer.name}</h1>
          <h3>Customer</h3>
        </div>
        <div className="detail-page-content">
          <div className="data-info">
            <h1>Bİlgiler
              <hr />
            </h1>
            <h3 className="title">Phone : <span>{customer.phone}</span></h3>
            <h3 className="title">Mail : <span>{customer.mail}</span> </h3>
            <h3 className="title">Address : <span>{customer.address}</span> </h3>
            <h3 className="title">City : <span>{customer.city}</span> </h3>
          </div>
          <div className="data-lists">
            <h1>Animal List</h1>
            <hr />
            <ul>
              {customerAnimalList?.map((item) => {
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
        <a style={{border:"none"}} onClick={deleteCustomer}>
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
  );
}

export default CustomerDetail;
