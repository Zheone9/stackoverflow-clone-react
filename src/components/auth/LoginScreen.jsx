import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { useDispatch } from "react-redux";
import {
  startLoginEmailPassword,
  startLoginWithGoogle,
} from "../../actions/auth";
import GoogleLoginButton from "./GoogleLoginButton";
import { useNavigate } from "react-router-dom";




const errorMessages = {
  loginFailed: "Login failed. Please check your email and password.",
  googleLoginFailed: "Google login failed.",
};

const LoginScreen = () => {
  const [formValues, handleInputChange] = useForm({
    email: "jajassddasss2@gmail.com",
    password: "123456",
  });
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(error);
  }, [setError]);

  const handleErrors = (errorType) => {
    setError(errorMessages[errorType]);
  };
  const dispatch = useDispatch();
  const { email, password } = formValues;

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await dispatch(startLoginEmailPassword(email, password));
    if (success) {
      console.log("Logeo exitoso");
      navigate("/");
    } else {
      handleErrors("loginFailed");
    }
  };

   const handleGoogleLogin = async (clientId, credential) => {
    const success = await dispatch(startLoginWithGoogle(clientId, credential));
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

  return (
    <div className=" container-login animate__animated animate__fadeIn">
      <div className="div-logo">
        <Link to="/">
          <img
            src="https://res.cloudinary.com/dzxhdnqm4/image/upload/v1682289016/stackoverflow_project_assets/stackoverflow_ewuyb6.png"
            alt=""
          />
        </Link>
      </div>
      <div className="mt-5">
        <div className="div-login-buttons mt-5 mb-5">
          <GoogleLoginButton onSuccess={onSuccess} onFailure={onFailure} />
        </div>
        <div className="div-login">
          <form action="">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                className="form-control"
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                value={password}
                name="password"
                onChange={handleInputChange}
                id="password"
                className="form-control"
              />
            </div>
            <div className="div-btn-login">
              <button onClick={handleLogin}>Log in</button>
            </div>
            {error && <p className="p-error-message">{error}</p>}
          </form>
        </div>
      </div>
      <div className="mt-5 text-center">
        Don’t have an account?{" "}
        <Link to="/auth/register" className="link">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default LoginScreen;
