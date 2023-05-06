import React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const OptionsMenu = ({ setOptionsClicked, menuItems, ...otherProps }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          minWidth: "auto",
          padding: "12px 12px",
          marginTop: "12px",
          marginRight: "10px",
        }} // Estilo
      >
        <i
          className="fa fa-ellipsis-v three-dots-icon"
          aria-hidden="true"
          onClick={() => setOptionsClicked(true)}
        ></i>
      </Button>
      <Menu
        id="basic-menu-no-condition"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {menuItems.map((item, index) => (
          <MenuItem key={index} onClick={item.onClick}>
            <item.Icon />
            {item.text}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default OptionsMenu;
