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
          (friend) => friend.username !== action.payload.friendInfo.username
        ),
        friendList: [...state.friendList, action.payload.friendInfo],
      };
    case types.rejectFriendRequest:
      return {
        ...state,
        friendRequestsReceived: state.friendRequestsReceived.filter(
          (friend) => friend.username !== action.payload.username
        ),
      };
    case types.removeFriend:
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

    case types.purgeFriendState:
      return {
        ...state,
        friendList: [],
        friendRequestsReceived: [],
        openedFriendRequests: false,
      };
    case types.newFriendRequest:
      return {
        ...state,
        friendRequestsReceived: [
          ...state.friendRequestsReceived,
          action.payload.friendInfo,
        ],
      };

    default:
      return state;
  }
};
