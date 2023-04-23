import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { useDispatch } from "react-redux";
import { startLoginEmailPassword } from "../../actions/auth";

const LoginScreen = () => {
  const [formValues, handleInputChange] = useForm({
    email: "jajassddasss2@gmail.com",
    password: "123456",
  });

  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { email, password } = formValues;
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(startLoginEmailPassword(email, password))
      .then(() => {
        console.log("Logeo exitoso");
      })
      .catch((e) => {
        console.log(e);
        setError(e.message);
      });
  };

  return (
    <>
      <div className="container-login animate__animated animate__fadeIn">
        <div className="center">
          <div className="div-logo">
            <Link to="/">
              <img src="stackoverflow.png" alt="" className="img-logo" />
            </Link>
          </div>
          <div className=" mt-5">
            <div className="div-login-buttons mt-5 mb-5">
              <button className="pointer">
                <img src="google.png" alt="" className="img-google" /> Log in
                with Google
              </button>
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
                {error ? error : null}
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
              </form>
            </div>
          </div>
          <div className="mt-5 text-center">
            Don’t have an account?
            <Link to="/register" className="link">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginScreen;
