import { types } from "../types/types";

const initialState = {
  isAuthenticated: false,
  user: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.userLoggedIn:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case types.userLoggedOut:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

export default authReducer;
