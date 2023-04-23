import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";

const RegisterScreen = () => {
  const [formValues, handleInputChange] = useForm({
    email: "",
    password: "",
    name: "",
  });

  const { email, password, name } = formValues;

  const handleSignUp = (e) => {
    e.preventDefault();

    //TODO
  };
  return (
    <div className="container-register animate__animated animate__fadeIn">
      <div className="text-center d-flex mr-5 div-info">
        <h1 className="bolder">Join the Stack Overflow community</h1>
      </div>
      <div>
        <div className="div-login-buttons mb-5">
          <button className="pointer">
            <img src="google.png" alt="" className="img-google" /> Sign up with
            Google
          </button>
        </div>
        <div className="div-register">
          <form action="">
            <div className="form-group">
              <label htmlFor="displayName">Display name</label>
              <input
                name="name"
                id="name"
                className="form-control"
                type="text"
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
          </form>
        </div>
        <div className="mt-5 text-center">
          Already have an account?{" "}
          <Link className="link" to="/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
