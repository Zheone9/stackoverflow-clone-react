import React, { useState } from "react";
import CustomFormik from "../../CustomFormik.jsx";
import { useDispatch } from "react-redux";
import { startSetUsername } from "../../../actions/account.js";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const SetUsername = ({ closeModal }) => {
  const [errorMsg, setErrorMsg] = useState(null);
  const dispatch = useDispatch();
  const onSubmit = async (values) => {
    setErrorMsg(null);
    console.log(values);
    const { username } = values;
    const { success, errorMsg } = await dispatch(startSetUsername(username));
    if (!success) {
      setErrorMsg(errorMsg);
    } else {
      console.log("Nombre de usuario cambiado exitosamente");
      closeModal();
    }
  };

  return (
    <div className="container-change-username">
      <CustomFormik
        initialValues={{ username: "" }}
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
              Cambiar nombre
            </button>
          </div>
        }
      />
      {errorMsg && <p className="p-error-message">{errorMsg}</p>}
    </div>
  );
};

export default SetUsername;
