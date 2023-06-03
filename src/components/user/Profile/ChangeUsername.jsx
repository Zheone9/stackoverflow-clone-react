import React, { useState } from "react";
import CustomFormik from "../../CustomFormik.jsx";
import { useDispatch, useSelector } from "react-redux";
import { startChangeUsername } from "../../../actions/account.js";
import { handleLogoutWithPreviousPage } from "../../../helpers/auth/authUtils.js";
import { selectUsername } from "../../../helpers/header/selectUsername.js";
import Snackbar from "@mui/material/Snackbar";
import { Slide, TextField } from "@mui/material";
import SnackbarContent from "@mui/material/SnackbarContent";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Box from "@mui/material/Box";

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

const ChangeUsername = ({ formik, username, errorMsg, open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className="text-start d-flex div-changeUsername">
        <p className="p-small p-label">Account username</p>
        <TextField
          id={`outlined-basic-username`}
          label="Username"
          variant="outlined"
          name="username"
          fullWidth
          color="primary"
          style={{ maxWidth: "400px" }}
          className="form-control"
          type="text"
          size="small"
          {...formik.getFieldProps("username")}
          sx={{
            "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#085078", // Cambia esto al color deseado
            },
          }}
          InputProps={{ sx: { fontSize: "0.9rem" } }}
          InputLabelProps={{
            sx: { fontSize: "0.8rem" },
          }}
        />
      </div>
      <div className="text-center">
        <p className="p-error-message-input p-small">
          {formik.errors["username"] || errorMsg}
        </p>
      </div>

      <Snackbar
        open={open}
        onClose={handleClose}
        message="Username changed"
        direction="left"
        autoHideDuration={1600}
        TransitionComponent={TransitionUp}
      >
        <SnackbarContent
          message={
            <Box display="flex" alignItems="center">
              <CheckBoxIcon />
              Username changed
            </Box>
          }
          sx={{
            backgroundColor: "#3D8EB9",
            color: "white",
            fontSize: "0.77rem",
          }}
        />
      </Snackbar>
    </div>
  );
};
export default ChangeUsername;
