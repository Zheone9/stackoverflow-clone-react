import React from "react";

const UserInfo = ({ author }) => {
  return (
    <div className="div-user">
      <div className="div-userInfo">
        <div className="div-userImage"></div>
        <div>
          <div className="div-userName">{author.username}</div>
          <div className="div-userPoints">{author.reputation}</div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
