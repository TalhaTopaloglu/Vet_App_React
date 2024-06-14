import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import VaccinesIcon from '@mui/icons-material/Vaccines';
import ExpandLess from "@mui/icons-material/ExpandLess";
import SouthRoundedIcon from '@mui/icons-material/SouthRounded';
import ExpandMore from "@mui/icons-material/ExpandMore";

export default function NestedList({ list, listName }) {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ width: "100%", maxWidth: 360 }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader
          component="div"
          id="nested-list-subheader"
        ></ListSubheader>
      }
    >
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          {listName === "Vaccine List" ? <VaccinesIcon/> : <SouthRoundedIcon />}
        </ListItemIcon>
        <ListItemText primary={listName} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {list.map((item,index) => {
            return (
            <ListItemButton key={index} sx={{ pl: 4 }}>
              {listName === "Work Day List" ? <ListItemText primary={`${item.availableDate}`} /> : <ListItemText primary={`${item.name}`} />}
            </ListItemButton>);
          })}
        </List>
      </Collapse>
    </List>
  );
}
