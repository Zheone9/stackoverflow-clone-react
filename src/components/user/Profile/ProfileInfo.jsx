import React from "react";

const ProfileInfo = ({ userProfile }) => {
  return (
    <div className="container-user-profile">
      <div
        className="div-userImage"
        style={{
          backgroundImage: `url(${userProfile.picture})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="user-info">
        <h3>{userProfile.username}</h3>
        <div className="username-reputation">
          <div
            className="div-userReputation"
            style={{
              backgroundImage:
                "url(https://res.cloudinary.com/dzxhdnqm4/image/upload/v1691991971/moneda-realista-dolares_1692-75_1_yuujys.avif)",
              backgroundSize: "cover",
            }}
          ></div>
          <p>{userProfile.reputation}</p>
        </div>
      </div>
    </div>
  );
};
export default ProfileInfo;
