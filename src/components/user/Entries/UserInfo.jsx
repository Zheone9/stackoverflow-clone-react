import { Link } from "react-router-dom";
import React from "react";

const UserInfo = ({ author }) => {
  return (
    <div className="div-user">
      <div className="div-userInfo">
        <div className="div-userImage">
          <img
            src={author.picture}
            style={{ width: "50px", borderRadius: "5px" }}
          ></img>
        </div>
        <div>
          <Link className="div-userName" to={`/user/${author.username}`}>
            {author.username}
          </Link>
          <div className="username-reputation">
            <div
              className="div-userReputation"
              style={{
                backgroundImage:
                  "url(https://res.cloudinary.com/dzxhdnqm4/image/upload/v1692221976/uploads/image-1692221975233.png)",
                backgroundSize: "cover",
              }}
            ></div>
            <p>{author.reputation}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
