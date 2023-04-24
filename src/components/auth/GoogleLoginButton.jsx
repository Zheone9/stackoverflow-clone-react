import React from "react";
import { GoogleLogin } from "@react-oauth/google";

const GoogleLoginButton = ({ onSuccess, onFailure, text }) => {
  return (
    <GoogleLogin
      onSuccess={onSuccess}
      onError={onFailure}
      theme="filled_blue"
      text={text}
      scope="email profile https://www.googleapis.com/auth/plus.login"
    />
  );
};

export default GoogleLoginButton;
