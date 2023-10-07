import React from "react";
import FriendRequest from "./FriendRequest";
import Divider from "@mui/material/Divider";

const FriendRequestList = ({ isLoading, friendRequestsReceived }) => {
  if (isLoading) return <p className="p-loading-friendRequests">Loading...</p>;

  return (
    <>
      {friendRequestsReceived.length > 0 && (
        <h4 className="h4-friend-requests">Friend requests</h4>
      )}

      {friendRequestsReceived.length === 0 && (
        <p className="p-friend-requests">No friend requests</p>
      )}
      {friendRequestsReceived.map((friend) => (
        <div>
          <Divider />
          <FriendRequest friend={friend} key={friend.username} />
        </div>
      ))}
    </>
  );
};

export default FriendRequestList;
