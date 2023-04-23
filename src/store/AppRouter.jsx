import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginScreen from "../components/auth/LoginScreen";
import RegisterScreen from "../components/auth/RegisterScreen";
import Header from "../components/Header";
import UserEntries from "../components/user/Entries/UserEntries";
import PublicRoute from "../routers/PublicRoute";
import { useSelector } from "react-redux";

const AppRouter = () => {
  const isAuthenticaded = useSelector((state) => state.auth.isAuthenticated);
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<UserEntries />} />
        <Route
          path="/login"
          element={
            <PublicRoute
              isAuthenticated={isAuthenticaded}
              element={<LoginScreen />}
            />
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute
              isAuthenticated={isAuthenticaded}
              element={<RegisterScreen />}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" replace={true} />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
