import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { useDispatch } from "react-redux";
import {
  startLoginWithGoogle,
  startRegisterWithEmail,
} from "../../actions/auth";
import { useState } from "react";
import GoogleLoginButton from "./GoogleLoginButton";

const RegisterScreen = () => {
  const [formValues, handleInputChange] = useForm({
    email: "",
    password: "",
    name: "",
  });

  const [error, setError] = useState(null);
  const { email, password, name } = formValues;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleLogin = async (clientId, credential) => {
    const success = await dispatch(startLoginWithGoogle(clientId, credential));
    dispatch(startLoginWithGoogle(clientId, credential));
    if (success) {
      console.log("Logeo exitoso");
      navigate("/");
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
  const handleSignUp = async (e) => {
    e.preventDefault();
    const { success, error } = await dispatch(
      startRegisterWithEmail(name, email, password)
    );
    if (success) {
      console.log("Registro exitoso");
      navigate("/");
    } else {
      setError(error.message);
    }
  };
  return (
    <div className="container-register animate__animated animate__fadeIn">
      <div className="text-center mr-5 div-info">
        <h1 className="bolder">Join the Stack Overflow community</h1>
      </div>
      <div>
        <div className="div-login-buttons mb-5">
          <GoogleLoginButton
            onSuccess={onSuccess}
            onFailure={onFailure}
            text="signup_with"
          />
        </div>
        <div className="div-register">
          <form action="">
            <div className="form-group">
              <label htmlFor="displayName">Display name</label>
              <input
                name="name"
                id="name"
                className="form-control"
                type="name"
                value={name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                onChange={handleInputChange}
                value={email}
                id="email"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                onChange={handleInputChange}
                value={password}
                id="password"
                className="form-control"
              />
            </div>
            <div className="div-btn-login">
              <button onClick={handleSignUp}>Sign up</button>
            </div>
            {error && <p className="p-error-message">{error}</p>}
          </form>
        </div>
        <div className="mt-5 text-center">
          Already have an account?{" "}
          <Link className="link" to="/auth/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
