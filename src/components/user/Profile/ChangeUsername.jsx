import React, { useState } from "react";
import CustomFormik from "../../CustomFormik.jsx";
import { useDispatch, useSelector } from "react-redux";
import { startChangeUsername } from "../../../actions/account.js";
import { handleLogoutWithPreviousPage } from "../../../helpers/auth/authUtils.js";
import { selectUsername } from "../../../helpers/header/selectUsername.js";
import { changeUsernameFormSchema } from "../../../helpers/formValidation/formSchema.js";
import Snackbar from "@mui/material/Snackbar";
import { Slide } from "@mui/material";
import SnackbarContent from "@mui/material/SnackbarContent";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Box from "@mui/material/Box";

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

const changeUsername = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const username = useSelector(selectUsername);
  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    resetMessages();
    if (username === values.username) {
      setErrorMsg("Please set a new username");
      return;
    }
    const { success, errorMsg, statusCode } = await dispatch(
      startChangeUsername(values.username)
    );
    if (statusCode === 401) {
      await handleLogoutWithPreviousPage(dispatch);
    } else if (statusCode === 400) {
      console.log(errorMsg);
      setErrorMsg(errorMsg);
    } else {
      setOpen(true);
      setSuccessMsg("Usuario cambiado exitosamente");
      console.log("Usuario cambiado exitosamente");
    }
  };

  const resetMessages = () => {
    setErrorMsg(null);
    setSuccessMsg(null);
  };
  const handleFieldChange = () => {
    resetMessages();
  };

  return (
    <div>
      <div className="text-start d-flex div-changeUsername">
        <p className="p-small p-label">Account username</p>
        <CustomFormik
          validationSchema={changeUsernameFormSchema}
          initialValues={{ username }}
          handleFieldChange={handleFieldChange}
          onSubmit={(values) => onSubmit(values)}
          fields={[
            {
              label: "Username",
              name: "username",
              type: "text",
            },
          ]}
          // submitButton={
          //   <div className="div-btn-login">
          //     <button className="btn btn-primary" type="submit">
          //       Change username
          //     </button>
          //   </div>
          // }
        />
      </div>

      {errorMsg && <p className="p-error-message p-small">{errorMsg}</p>}
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

export default changeUsername;
