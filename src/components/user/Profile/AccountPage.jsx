import React, { useRef, useState } from "react";
import ChangeAvatar from "./ChangeAvatar.jsx";
import { useFormik } from "formik";
import { accountSettingsSchema } from "../../../helpers/formValidation/formSchema.js";
import { useDispatch, useSelector } from "react-redux";
import { selectUsername } from "../../../helpers/header/selectUsername.js";
import {
  startChangeUsername,
  uploadProfilePicture,
} from "../../../actions/account.js";
import { handleLogoutWithPreviousPage } from "../../../helpers/auth/authUtils.js";
import ChangeUsername from "./ChangeUsername.jsx";
import CustomSnackbar from "./CustomSnackbar.jsx";

const AccountPage = () => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [messageSnackbar, setMessageSnackbar] = useState(null);
  const [open, setOpen] = useState(false);
  const [fileName, setFileName] = useState(null);
  const dispatch = useDispatch();
  const username = useSelector(selectUsername);
  const initialValues = {
    username,
    avatar: "",
  };

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
        return;
      } else {
        setOpen(true);
        setInitialUserName(values.username);
        setMessageSnackbar("Cambios guardados exitosamente");
      }
    }
    if (avatar !== initialAvatar) {
      const { success, errorMsg, statusCode } = await dispatch(
        uploadProfilePicture(avatar)
      );
      console.log(success);
      if (success) {
        setFileName(null);
        setInitialAvatar(avatar);
        setOpen(true);
        setMessageSnackbar("Cambios guardados exitosamente");
      } else if (statusCode === 401) {
        await handleLogoutWithPreviousPage(dispatch);
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
    <div className="text-center max-w-1000">
      <form style={{ display: "none" }} onChange={handleFieldChange} />
      <ChangeUsername
        formik={formik}
        username={username}
        errorMsg={errorMsg}
        open={open}
        setOpen={setOpen}
      />
      <ChangeAvatar
        avatar={avatar}
        setAvatar={setAvatar}
        setFileName={setFileName}
        fileName={fileName}
      />
      <div className="div-btn-login" style={{ textAlign: "right" }}>
        <button
          className="btn btn-primary"
          onClick={formik.handleSubmit}
          type="submit"
        >
          Save
        </button>
      </div>
      <CustomSnackbar
        message={messageSnackbar}
        onClose={handleClose}
        setOpen={setOpen}
        open={open}
      />
    </div>
  );
};

export default AccountPage;
