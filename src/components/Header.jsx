import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { logoutUser, startHandleLogout } from "../actions/auth";
import { useNavigate } from "react-router-dom";
import AccountMenu from "./user/AccountMenu.jsx";
import { selectUsername } from "../helpers/header/selectUsername.js";
import React from "react";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useProSidebar } from "react-pro-sidebar";

const Header = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const username = useSelector(selectUsername);
  const dispatch = useDispatch();
  const { toggleSidebar, collapseSidebar, broken, collapsed } = useProSidebar();
  const handleLogout = async () => {
    const success = await dispatch(startHandleLogout());
    if (!success) return console.log("Hubo un error al desloguearse");
    navigate("/");
  };
  const location = useLocation();
  const showOnProfile = location.pathname.split("/")[1] === "profile";
  return (
    <header>
      <div className="container-header">
        <img
          src="https://res.cloudinary.com/dzxhdnqm4/image/upload/v1682289016/stackoverflow_project_assets/Stack_Overflow_logo_szqi3b.svg"
          onClick={() => navigate("/")}
          className="img-stackoverflow"
          alt=""
        />
        <div className="d-flex">
          {showOnProfile && (
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                className="icon-menubar"
              >
                <MenuIcon onClick={() => toggleSidebar()} />
              </IconButton>
            </Toolbar>
          )}

          <img
            src="https://res.cloudinary.com/dzxhdnqm4/image/upload/v1682289016/stackoverflow_project_assets/stackoverflow_ewuyb6.png"
            alt=""
            className="mobile-logo"
            onClick={() => navigate("/")}
          />
        </div>

        <div className="div-buttons">
          {isAuthenticated ? (
            <AccountMenu
              handleLogout={handleLogout}
              usernameLetter={username[0].toUpperCase()}
            />
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
