import { types } from "../types/types";

const initialState = {
  isAuthenticated: false,
  user: null,
  previousPage: null,
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

    case types.changeUsername:
      return {
        ...state,
        user: {
          ...state.user,
          username: action.payload.username,
        },
      };

    case types.setPreviousPage:
      return { ...state, previousPage: action.payload };
    default:
      return state;
  }
};

export default authReducer;
