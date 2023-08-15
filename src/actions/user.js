import { types } from "../types/types";
import axios from "axios";

const APIURL = import.meta.env.VITE_REACT_API_URL;

export const startAddFriend = (username) => {
  return async (dispatch) => {
    try {
      await axios.post(
        `${APIURL}/users/send-friend-request/${username}`,
        null,
        {
          withCredentials: true,
        }
      );
      dispatch(sentFriendRequest(username));
      return {
        success: true,
        errorMsg: null,
      };
    } catch (error) {
      console.error("Error adding friend:", error);
      return {
        success: false,
        errorMsg: error.response.data.message,
      };
    }
  };
};
export const startRemoveFriend = (username) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${APIURL}/users/remove-friend/${username}`, {
        withCredentials: true,
      });
      dispatch(removeFriend(username));
      return {
        success: true,
        errorMsg: null,
      };
    } catch (error) {
      console.error("Error removing friend:", error);
      return {
        success: false,
        errorMsg: error.response.data.message,
      };
    }
  };
};

const removeFriend = (username) => ({
  type: types.removeFriend,
  payload: {
    username,
  },
});

export const startGetFriendsSentRequests = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${APIURL}/users/get-friend-requests`,
        null,
        {
          withCredentials: true,
        }
      );
      console.log(response.data.payload);
      dispatch(getFriendsSentRequests(response.data.payload));
      return {
        success: true,
        errorMsg: null,
      };
    } catch (error) {
      console.error("Error getting friends sent requests:", error);
      return {
        success: false,
        errorMsg: error.response.data.message,
      };
    }
  };
};
export const startCancelFriendRequest = (username) => {
  return async () => {
    try {
      await axios.delete(`${APIURL}/users/cancel-friend-request/${username}`, {
        withCredentials: true,
      });
      return {
        success: true,
        errorMsg: null,
      };
    } catch (error) {
      console.error("Error cancelling friend request:", error);
      return {
        success: false,
        errorMsg: error.response.data.message,
      };
    }
  };
};

export const startAcceptFriendRequest = (username) => {
  return async (dispatch) => {
    try {
      await axios.post(
        `${APIURL}/users/accept-friend-request/${username}`,
        null,
        {
          withCredentials: true,
        }
      );
      dispatch(acceptFriendRequest(username));
      return {
        success: true,
        errorMsg: null,
      };
    } catch (error) {
      console.error("Error accepting friend request:", error);
      return {
        success: false,
        errorMsg: error.response.data.message,
      };
    }
  };
};
export const startOpenedFriendRequestsReceived = () => {
  return async (dispatch) => {
    try {
      await axios.post(`${APIURL}/users/open-friend-requests`, null, {
        withCredentials: true,
      });
      dispatch(openFriendRequestsReceived(true));
      return {
        success: true,
        errorMsg: null,
      };
    } catch (error) {
      console.error("Error opening friend requests received:", error);
      return {
        success: false,
        errorMsg: error.response.data.message,
      };
    }
  };
};

export const startGetFriendRequestsReceived = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${APIURL}/users/get-friend-requests`, {
        withCredentials: true,
      });
      const friendRequests =
        response.data.friendRequests.friendRequestsReceived;
      const openedFriendRequests =
        response.data.friendRequests.openedFriendRequests;
      dispatch(getFriendRequestsReceived(friendRequests));
      dispatch(openFriendRequestsReceived(openedFriendRequests));
      return {
        success: true,
        errorMsg: null,
      };
    } catch (error) {
      console.error("Error getting friend requests received:", error);
      return {
        success: false,
        errorMsg: error.response.data.message,
      };
    }
  };
};
const openFriendRequestsReceived = (value) => ({
  type: types.openFriendRequests,
  payload: {
    value,
  },
});

const getFriendRequestsReceived = (friendRequestsReceived) => ({
  type: types.getFriendRequestsReceived,
  payload: {
    friendRequestsReceived,
  },
});

const acceptFriendRequest = (username) => ({
  type: types.acceptFriendRequest,
  payload: {
    username,
  },
});

const getFriendsSentRequests = (friendsSentRequests) => ({
  type: types.getFriendsSentRequests,
  payload: {
    friendsSentRequests,
  },
});

const sentFriendRequest = (username) => ({
  type: types.sentFriendRequest,
  payload: {
    username,
  },
});
