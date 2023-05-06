import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const OptionsMenuEntry = ({ setOptionsClicked, menuItems, ...otherProps }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { authorId, userId } = otherProps;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleReportQuestion = async () => {
    //:todo
    handleClose();
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
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {menuItems.map(
          (item, index) =>
            // Evalúa la condición aquí, si no existe, muestra el elemento por defecto
            (!item.condition || item.condition(authorId, userId)) && (
              <MenuItem
                key={index}
                onClick={() => {
                  item.onClick();
                  handleClose();
                }}
              >
                <item.Icon />
                {item.text}
              </MenuItem>
            )
        )}
      </Menu>
    </div>
  );
};
export default OptionsMenuEntry;
