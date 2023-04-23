import React from "react";
import { Link } from "react-router-dom";

const ModalDialogLogin = ({ closeModal, action }) => {
  const handleCloseModal = () => {
    closeModal();
  };
  return (
    <div className="dialog">
      <h1 className="mb-5">Join the Stack Overflow community </h1>
      <p className="mb-2">You need 5 reputation to {action} posts.</p>
      <p>
        Join Stack Overflow to start earning reputation and unlocking new
        privileges like voting and commenting.
      </p>
      <i class="fa-solid fa-xmark close-dialog" onClick={handleCloseModal}></i>
      <div className="dialog-div-login-buttons">
        <div className="div-login-buttons mt-5 mb-5">
          <button className="pointer">
            <img src="google.png" alt="" className="img-google" /> Log in with
            Google
          </button>
          <Link to="/login">
            <button className="pointer mt-1">
              <i class="fa-solid fa-envelope"></i>
              Log in with Email
            </button>
          </Link>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default ModalDialogLogin;
