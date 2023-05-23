import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setPreviousPage,
  startLoginUsernamePassword,
  startLoginWithGoogle,
} from "../../actions/auth";
import GoogleLoginButton from "./GoogleLoginButton";
import { useNavigate } from "react-router-dom";
import CustomFormik from "../CustomFormik.jsx";
import { loginFormSchema } from "../../helpers/formValidation/formSchema.js";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState(null);
  const prevPage = useSelector((state) => state.auth?.previousPage);
  const onSubmit = async (values) => {
    const { username, password } = values;
    const { success, errorMsg } = await dispatch(
      startLoginUsernamePassword(username, password)
    );

    if (!success) {
      setErrorMsg(errorMsg);
    } else {
      if (prevPage) {
        return navigate(prevPage);
      }
      console.log("Logeo exitoso");
      return navigate("/");
    }
  };

  useEffect(() => {
    // Limpia el valor de 'prevPage' después de la redirección
    return () => {
      dispatch(setPreviousPage(null));
    };
  }, [navigate]);

  const onSuccess = async ({ clientId, credential }) => {
    await dispatch(startLoginWithGoogle(clientId, credential));
    if (prevPage) {
      return navigate(prevPage);
    }
  };
  const fields = [
    {
      label: "Username",
      name: "username",
      type: "text",
    },
    {
      label: "Password",
      name: "password",
      type: "password",
    },
  ];
  const onFailure = (e) => {
    console.log("Login no exitoso", e);
  };

  return (
    <div className="container-login animate__animated animate__fadeIn">
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
          <CustomFormik
            initialValues={{ username: "", password: "" }}
            validationSchema={loginFormSchema}
            onSubmit={(values) => onSubmit(values)}
            fields={fields}
            submitButton={
              <div className="div-btn-login">
                <button className="btn btn-primary" type="submit">
                  Login
                </button>
              </div>
            }
          />
          {errorMsg && <p className="p-error-message">{errorMsg}</p>}
        </div>
      </div>
      <div className="mt-5 mb-5 text-center">
        Don’t have an account?{" "}
        <Link to="/auth/register" className="link">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default LoginScreen;
