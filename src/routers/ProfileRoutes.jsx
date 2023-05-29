import React from "react";
import { Outlet } from "react-router-dom";
import SidebarComponent from "../components/user/Profile/SidebarComponent.jsx";

const ProfileRoutes = () => {
  return (
    <>
      <SidebarComponent />
      <div className="container-profile-section">
        <Outlet />
      </div>
    </>
  );
};
export default ProfileRoutes;
