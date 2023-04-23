import { types } from "../types/types";
import axios from "axios";
const APIURL = import.meta.env.VITE_REACT_API_URL;

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
      const response = await axios.post(`${APIURL}/auth`, {
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

export const startLoginWithGoogle = (clientId, tokenId) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${APIURL}/auth/google`, {
        id_token: tokenId,
        clientId,
      });
      const { token } = response.data;
      localStorage.setItem("token", token);
      dispatch(login(response.data.payload));
    } catch (error) {
      // dispatch({ type: LOGIN_WITH_GOOGLE_FAILURE, payload: error.response.data.message });
      return Promise.reject(error);
    }
  };
};
