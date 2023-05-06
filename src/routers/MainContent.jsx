import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import UserEntries from "../components/user/Entries/UserEntries";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import AuthRoutes from "./AuthRoutes";
import PublicRoute from "./PublicRoute";
import LoginScreen from "../components/auth/LoginScreen";
import RegisterScreen from "../components/auth/RegisterScreen";
import StyledContainer from "../helpers/styledContainer";
import ProfileRoutes from "./ProfileRoutes.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import Dashboard from "../components/user/Profile/Dashboard.jsx";

const MainContent = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <StyledContainer>
      <Routes>
        <Route path="/" element={<UserEntries />} />
        <Route path="/auth" element={<AuthRoutes />}>
          <Route
            path="login"
            element={
              <PublicRoute
                isAuthenticated={isAuthenticated}
                element={<LoginScreen />}
              />
            }
          />
          <Route
            path="register"
            element={
              <PublicRoute
                isAuthenticated={isAuthenticated}
                element={<RegisterScreen />}
              />
            }
          />
          <Route index element={<Navigate to="/auth/login" />} />
        </Route>
        <Route path="/profile" element={<ProfileRoutes />}>
          <Route
            path="dashboard"
            element={
              <PrivateRoute
                isAuthenticated={isAuthenticated}
                element={<Dashboard />}
              />
            }
          />
          <Route index element={<Navigate to="/profile/dashboard" />} />
          <Route path="*" element={<Navigate to="/profile/dashboard" />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace={true} />} />
      </Routes>
    </StyledContainer>
  );
};
export default MainContent;
