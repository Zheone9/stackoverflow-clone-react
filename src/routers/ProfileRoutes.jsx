import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import SidebarComponent from "../components/user/Profile/SidebarComponent.jsx";

const ProfileRoutes = () => {
  return (
    <div className="container-profile-section">
      <SidebarComponent />
      <Outlet />
    </div>
  );
};
export default ProfileRoutes;
