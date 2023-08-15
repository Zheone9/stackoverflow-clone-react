import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { startAcceptFriendRequest } from "../../../actions/user";

const FriendRequest = ({ friend }) => {
  const dispatch = useDispatch();
  const handleAcceptFriendRequest = () => {
    dispatch(startAcceptFriendRequest(friend.username));
  };
  const handleRejectFriendRequest = () => {
    console.log("Reject friend request");
  };

  return (
    <div className="div-container-userImage-profile-fr">
      <div
        className="div-userImage-fr"
        style={{
          backgroundImage: `url(${friend.picture})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="div-user-info-fr">
        <h5>{friend.username}</h5>
        <div className="div-username-reputation"></div>
        <div className="buttons-profile">
          <button
            className="btn-add-friend"
            onClick={() => handleAcceptFriendRequest()}
          >
            Accept
          </button>
          <button
            className="btn-report"
            onClick={() => handleRejectFriendRequest()}
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default FriendRequest;
