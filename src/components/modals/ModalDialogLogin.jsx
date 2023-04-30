import React from "react";
import {Link} from "react-router-dom";
import GoogleLoginButton from "../auth/GoogleLoginButton.jsx";
import {startLoginWithGoogle} from "../../actions/auth.js";
import {useDispatch} from "react-redux";

const ModalDialogLogin = ({ closeModal, action }) => {
  const handleCloseModal = () => {
    closeModal();
  };

  const dispatch=useDispatch();

    const handleGoogleLogin = async (clientId, credential) => {
        const success = await dispatch(startLoginWithGoogle(clientId, credential));
        if (success) {
            console.log("Logeo exitoso");
            window.location.reload()
        } else {
            handleErrors("googleLoginFailed");
        }
    };

    const onSuccess = ({ clientId, credential }) => {
        handleGoogleLogin(clientId, credential);
    };

    const onFailure = (e) => {
        console.log("Login no exitoso", e);
    };
  return (
    <div className="dialog">
      <h1 className="mb-5">Join the Stack Overflow community </h1>
      <p className="mb-2">You need 5 reputation to {action} posts.</p>
      <p>
        Join Stack Overflow to start earning reputation and unlocking new
        privileges like voting and commenting.
      </p>
      <i className="fa-solid fa-xmark close-dialog" onClick={handleCloseModal}></i>
      <div className="dialog-div-login-buttons">
        <div className="div-login-buttons mt-5 mb-5">

              <GoogleLoginButton onSuccess={onSuccess} onFailure={onFailure} theme="outline"/>
          <Link to="/auth/login">
            <button className="pointer mt-1">
              <i className="fa-solid fa-envelope"></i>
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
