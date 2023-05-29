import React, { useState } from "react";
import CustomFormik from "../../CustomFormik.jsx";
import { useDispatch, useSelector } from "react-redux";
import { startChangeUsername } from "../../../actions/account.js";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { handleLogoutWithPreviousPage } from "../../../helpers/auth/authUtils.js";
import { selectUsername } from "../../../helpers/header/selectUsername.js";
import { changeUsernameFormSchema } from "../../../helpers/formValidation/formSchema.js";

const changeUsername = () => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const username = useSelector(selectUsername);
  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    resetMessages();
    if (username === values.username) {
      setErrorMsg("Username must be different");
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
    <div className="text-center">
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
        submitButton={
          <div className="div-btn-login">
            <button className="btn btn-primary" type="submit">
              Change username
            </button>
          </div>
        }
      />
      {errorMsg && <p className="p-error-message">{errorMsg}</p>}
      {successMsg && (
        <div className="animate__animated animate__heartBeat mt-1">
          <CheckCircleOutlineIcon style={{ color: "green" }} />
        </div>
      )}
    </div>
  );
};

export default changeUsername;
