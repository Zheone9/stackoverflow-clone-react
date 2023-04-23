import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element, isAuthenticaded }) => {
  return isAuthenticaded ? element : <Navigate to="/" />;
};

export default PrivateRoute;
