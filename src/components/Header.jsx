import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {startHandleLogout} from "../actions/auth";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const handleLogout = async() => {
   const success=await dispatch(startHandleLogout());
   if(!success) return console.log('Hubo un error al desloguearse')
    window.location.reload();
  };

  return (
    <header>
      <div className="container-header">
        <img
          src="https://res.cloudinary.com/dzxhdnqm4/image/upload/v1682289016/stackoverflow_project_assets/Stack_Overflow_logo_szqi3b.svg"
          onClick={() => navigate("/")}
          className="img-stackoverflow"
         alt=""/>

        <img
          src="https://res.cloudinary.com/dzxhdnqm4/image/upload/v1682289016/stackoverflow_project_assets/stackoverflow_ewuyb6.png"
          alt=""
          className="mobile-logo"
          onClick={() => navigate("/")}
        />

        <div className="div-buttons">
          {isAuthenticated ? (
            <button className="btn btn-secondary" onClick={handleLogout}>
              Log out
            </button>
          ) : (
            <>
              <Link to="/auth/login">
                <button className="btn btn-secondary">Log in</button>
              </Link>
              <Link to="/auth/register">
                <button className="btn btn-primary">Sign up</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
