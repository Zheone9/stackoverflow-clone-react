import { types } from "../types/types";
import axios from "axios";
const APIURL = import.meta.env.VITE_REACT_API_URL;

export const logoutUser = () => {
  return {
    type: types.userLoggedOut,
  };
};

export const login = ({ uid, username }) => {
  return {
    type: types.userLoggedIn,
    payload: {
      username,
      uid,
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
  return async (dispatch) => {
    try {
      const response = await axios.post(`${APIURL}/auth`, {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      dispatch(login(response.data.payload));
      return true;
    } catch (error) {
      return false;
    }
  };
};

export const startLoginWithGoogle = (clientId, tokenId) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${APIURL}/auth/google`,
        {
          id_token: tokenId,
          clientId,
        },
        { withCredentials: true }
      );
      const { token } = response.data;
      localStorage.setItem("token", token);
      dispatch(login(response.data.payload));
      return true;
    } catch (error) {
      // dispatch({ type: LOGIN_WITH_GOOGLE_FAILURE, payload: error.response.data.message });
      return false;
    }
  };
};

export const startRegisterWithEmail = (username, email, password) => {
  return async () => {
    try {
      const response = await axios.post(`${APIURL}/auth/new`, {
        username,
        email,
        password,
      });
      const { token } = response.data;
      localStorage.setItem("token", token);
      dispatch(login(response.data.payload));
      return {
        success: true,
        error: null,
      };
    } catch (error) {
      // dispatch({ type: LOGIN_WITH_GOOGLE_FAILURE, payload: error.response.data.message });
      console.log(error);
      return {
        success: false,
        error: error.response.data.error,
      };
    }
  };
};
