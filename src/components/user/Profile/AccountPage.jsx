import React, { useRef, useState } from "react";
import ChangeAvatar from "./ChangeAvatar.jsx";
import { useFormik } from "formik";
import { accountSettingsSchema } from "../../../helpers/formValidation/formSchema.js";
import { useDispatch, useSelector } from "react-redux";
import { selectUsername } from "../../../helpers/header/selectUsername.js";
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Box from "@mui/material/Box";
import {
  startChangeUsername,
  uploadProfilePicture,
} from "../../../actions/account.js";
import { handleLogoutWithPreviousPage } from "../../../helpers/auth/authUtils.js";
import ChangeUsername from "./ChangeUsername.jsx";
import { Slide } from "@mui/material";

const AccountPage = () => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const username = useSelector(selectUsername);
  const initialValues = {
    username,
    avatar: "",
  };
  function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
  }

  const userPicture = useSelector((state) => state.auth.user.picture);
  const [avatar, setAvatar] = useState(
    userPicture ||
      "https://res.cloudinary.com/dzxhdnqm4/image/upload/v1689286918/apkgv-awgpv_vfxpbc.avif"
  );
  const [initialUserName, setInitialUserName] = useState(username);
  const [initialAvatar, setInitialAvatar] = useState(
    userPicture ||
      "https://res.cloudinary.com/dzxhdnqm4/image/upload/v1689286918/apkgv-awgpv_vfxpbc.avif"
  );
  const handleClose = () => {
    setOpen(false);
  };
  const validationSchema = accountSettingsSchema([username]);

  const onSubmit = async (values) => {
    resetMessages();
    if (values.username !== initialUserName) {
      const { success, errorMsg, statusCode } = await dispatch(
        startChangeUsername(values.username)
      );
      if (statusCode === 401) {
        await handleLogoutWithPreviousPage(dispatch);
      } else if (statusCode === 400) {
        setErrorMsg("This username is already taken");
      } else {
        setOpen(true);
        setInitialUserName(values.username);
        setSuccessMsg("Usuario cambiado exitosamente");
      }
    }
    if (avatar !== initialAvatar) {
      const { success, errorMsg, statusCode } = await dispatch(
        uploadProfilePicture(avatar)
      );
      console.log(success);
      if (success) {
        setInitialAvatar(avatar);
        setOpen(true);
        setSuccessMsg("Avatar cambiado exitosamente");
      }
    }
  };
  const resetMessages = () => {
    setErrorMsg(null);
    setSuccessMsg(null);
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validate: (values) => {
      setErrorMsg(null);
    },
  });
  const handleFieldChange = () => {
    console.log("a");
  };
  return (
    <div className="text-center">
      <form style={{ display: "none" }} onChange={handleFieldChange} />
      <ChangeUsername
        formik={formik}
        username={username}
        errorMsg={errorMsg}
        open={open}
        setOpen={setOpen}
      />
      <ChangeAvatar avatar={avatar} setAvatar={setAvatar} />
      <div className="div-btn-login" style={{ textAlign: "right" }}>
        <button
          className="btn btn-primary"
          onClick={formik.handleSubmit}
          type="submit"
        >
          Save
        </button>
      </div>
      <Snackbar
        open={open}
        onClose={handleClose}
        message="Cambios guardados exitosamente"
        direction="left"
        autoHideDuration={1600}
        TransitionComponent={TransitionUp}
      >
        <SnackbarContent
          message={
            <Box display="flex" alignItems="center">
              <CheckBoxIcon />
              Cambios guardados exitosamente
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

export default AccountPage;
