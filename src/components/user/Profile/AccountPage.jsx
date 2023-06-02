import React from "react";
import ChangeUsername from "./ChangeUsername.jsx";
import ChangeAvatar from "./ChangeAvatar.jsx";

const AccountPage = () => {
  return (
    <div className="text-center">
      <ChangeUsername />
      <ChangeAvatar />
    </div>
  );
};

export default AccountPage;
