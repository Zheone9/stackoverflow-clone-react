import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ element, isAuthenticated }) => {
  return isAuthenticated ? <Navigate to="/" replace={true} /> : element;
};

export default PublicRoute;
