import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  startLoginWithGoogle,
  startLoginUsernamePassword,
  startRegisterWithEmail,
} from "../../actions/auth";

import GoogleLoginButton from "./GoogleLoginButton";
import { registerFormSchema } from "../../helpers/formValidation/formSchema.js";
import CustomFormik from "../CustomFormik.jsx";

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSuccess = async ({ clientId, credential }) => {
    const success = await dispatch(startLoginWithGoogle(clientId, credential));
    if (success) {
      console.log("Logeo exitoso");
      return navigate("/");
    }
  };

  const onFailure = (e) => {
    console.log("Login no exitoso", e);
  };
  const [errorMsg, setErrorMsg] = useState(null);
  const onSubmit = async (values) => {
    const { username, email, password } = values;
    console.log(values);
    const { success, errorMsg } = await dispatch(
      startRegisterWithEmail(username, email, password)
    );
    if (!success) {
      setErrorMsg(errorMsg);
    } else {
      console.log("Registro exitoso");
      return navigate("/");
    }
  };

  const fields = [
    { name: "username", label: "Username", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "password", label: "Password", type: "password" },
    { name: "confirmPassword", label: "Confirm password", type: "password" },
  ];

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
          <CustomFormik
            initialValues={{
              username: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={registerFormSchema}
            onSubmit={(values) => onSubmit(values)}
            fields={fields}
            submitButton={
              <div className="div-btn-login">
                <button className="btn btn-primary" type="submit">
                  Sign up
                </button>
              </div>
            }
          />
          {errorMsg && <p className="p-error-message">{errorMsg}</p>}
        </div>
        <div className="mt-5 mb-5 text-center">
          <p className="p-info-auth"> Already have an account?</p>
          <Link className="link" to="/auth/login">
            <p className="p-info-auth"> Login</p>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default RegisterScreen;
