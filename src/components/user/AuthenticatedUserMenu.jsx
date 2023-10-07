import React from "react";
import AccountMenu from "./AccountMenu.jsx";
import { Link } from "react-router-dom";

const AuthenticatedUserMenu = ({
  isAuthenticated,
  handleLogout,
  username,
  picture,
}) => {
  if (!isAuthenticated) {
    return (
      <>
        <Link to="/auth/login">
          <button className="btn btn-secondary">Log in</button>
        </Link>
        <Link to="/auth/register">
          <button className="btn btn-primary">Sign up</button>
        </Link>
      </>
    );
  }
  username = username || "?";
  return (
    <AccountMenu
      handleLogout={handleLogout}
      usernameLetter={username[0].toUpperCase()}
      picture={picture}
      username={username} 

      // Aquí también puedes pasar 'picture' a 'AccountMenu' si lo necesitas
    />
  );
};

export default AuthenticatedUserMenu;
