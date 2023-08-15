import { types } from "../types/types";

const initialState = {
  friendList: [],
  friendRequestsReceived: [],
  openedFriendRequests: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.getFriendList:
      return {
        ...state,
        friendList: action.payload,
      };
    case types.acceptFriendRequest:
      return {
        ...state,
        friendRequestsReceived: state.friendRequestsReceived.filter(
          (friend) => friend.username !== action.payload.username
        ),
        friendList: [...state.friendList, action.payload.username],
      };
    case types.rejectFriendRequest:
      return {
        ...state,
        friendRequestsReceived: state.friendRequestsReceived.filter(
          (friend) => friend.username !== action.payload.username
        ),
      };
    case types.removeFriend:
      console.log(action.payload.username);
      return {
        ...state,
        friendList: state.friendList.filter(
          (friend) => friend.username !== action.payload.username
        ),
      };

    case types.getFriendRequestsReceived:
      return {
        ...state,
        friendRequestsReceived: action.payload.friendRequestsReceived,
      };

    case types.openFriendRequests:
      return {
        ...state,
        openedFriendRequests: action.payload.value,
      };

    default:
      return state;
  }
};
