import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../actions/auth";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());

    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <header>
      <img
        src="Stack_Overflow_logo.svg"
        onClick={() => navigate("/")}
        className="img-stackoverflow"
      />

      <img
        src="stackoverflow.png"
        alt=""
        className="img-logo mobile-logo"
        onClick={() => navigate("/")}
      />

      <div className="div-buttons">
        {isAuthenticated ? (
          <button className="btn btn-secondary" onClick={handleLogout}>
            Log out
          </button>
        ) : (
          <>
            <Link to="/login">
              <button className="btn btn-secondary">Log in</button>
            </Link>
            <Link to="/register">
              <button className="btn btn-primary">Sign up</button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
