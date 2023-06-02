import React from "react";

import { startHandleLogout, startLoginWithGoogle } from "../../actions/auth.js";
import { useDispatch } from "react-redux";

import LogoutIcon from "@mui/icons-material/Logout";
import SetUsername from "../user/Profile/SetUsername.jsx";

const ModalSetUsername = ({ closeModal }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(startHandleLogout());
    closeModal();
  };

  return (
    <div className="dialog">
      <h3 className="mb-5 h3-set-username">Configure your new username</h3>
      <div className="dialog-div-login-buttons">
        <div className="div-login-buttons mt-5 mb-5">
          <button className="pointer mt-1" onClick={() => handleLogout()}>
            <div className="div-logout-main">
              <LogoutIcon className="logout-icon-main" />
              <span>Logout</span>
            </div>
          </button>
        </div>
      </div>
      <SetUsername closeModal={closeModal} />
    </div>
  );
};

export default ModalSetUsername;
