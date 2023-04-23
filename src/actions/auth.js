import { types } from "../types/types";
import axios from "axios";

export const logoutUser = () => {
  return {
    type: types.userLoggedOut,
  };
};

export const login = (displayName) => {
  return {
    type: types.userLoggedIn,
    payload: {
      displayName,
    },
  };
};
export const addNewEntry = (entryData) => ({
  type: types.addNewEntry,
  payload: {
    ...entryData,
  },
});
export const startLoginEmailPassword = (email, password) => {
  console.log(email, password);
  return async (dispatch) => {
    try {
      const response = await axios.post("http://192.168.101.7:8080/api/auth", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      dispatch(login(response.data.payload.username));
    } catch (error) {
      return Promise.reject(error);
      // dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
    }
  };
};
