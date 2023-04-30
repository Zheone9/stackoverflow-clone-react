import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch } from "react-redux";
import { startDeleteQuestion } from "../../../actions/entries";
import DeleteIcon from "@mui/icons-material/Delete";
import FlagIcon from "@mui/icons-material/Flag";

const BasicMenu = ({ setOptionsClicked, questionUid, userId, authorId }) => {
  const deleteIconStyle = {
    color: "red", // Cambia el color del ícono
    fontSize: "1.7rem", // Cambia el tamaño del ícono
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDeleteQuestion = async () => {
    await dispatch(startDeleteQuestion(questionUid));
    handleClose();
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
        {authorId === userId && (
          <MenuItem onClick={handleDeleteQuestion}>
            <DeleteIcon style={deleteIconStyle} />
            Delete question
          </MenuItem>
        )}

        <MenuItem onClick={handleReportQuestion}>
          <FlagIcon />
          Report question
        </MenuItem>
      </Menu>
    </div>
  );
};
export default BasicMenu;
