import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const FriendListComponent = ({ friendList }) => {
  return (
    <div className="div-border-friendList">
      <div className="div-header-friendList">
        Friends: {friendList.length}
        <div className="div-grid-friendList">
          {friendList.map((friend) => (
            <div key={friend.username}>
              <div className="container-user-profile">
                <Link className="div-userName" to={`/user/${friend.username}`}>
                  <div
                    className="div-userImage"
                    style={{
                      backgroundImage: `url(${friend.picture})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
                </Link>
                <div className="friend-info">
                  <Link
                    className="div-userName"
                    to={`/user/${friend.username}`}
                  >
                    <h3>{friend.username}</h3>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FriendListComponent;
