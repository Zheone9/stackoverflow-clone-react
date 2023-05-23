import React from "react";
import { GoogleLogin } from "@react-oauth/google";

const GoogleLoginButton = ({
  onSuccess,
  onFailure,
  text,
  theme = "filled_blue",
}) => {
  return (
    <GoogleLogin
      onSuccess={onSuccess}
      onError={onFailure}
      theme={theme}
      text={text}
      scope="email profile https://www.googleapis.com/auth/plus.login"
    />
  );
};

export default GoogleLoginButton;
