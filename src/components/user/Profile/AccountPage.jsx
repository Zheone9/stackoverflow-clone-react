import React, { useRef, useState } from "react";
import ChangeAvatar from "./ChangeAvatar.jsx";
import { useFormik } from "formik";
import { accountSettingsSchema } from "../../../helpers/formValidation/formSchema.js";
import { useDispatch, useSelector } from "react-redux";
import { selectUsername } from "../../../helpers/header/selectUsername.js";
import { startChangeUsername } from "../../../actions/account.js";
import { handleLogoutWithPreviousPage } from "../../../helpers/auth/authUtils.js";
import ChangeUsername from "./ChangeUsername.jsx";

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
  const validationSchema = accountSettingsSchema([username]);

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
      setErrorMsg("This username is already taken");
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
      <ChangeAvatar />
      <div className="div-btn-login" style={{ textAlign: "right" }}>
        <button
          className="btn btn-primary"
          onClick={formik.handleSubmit}
          type="submit"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AccountPage;
