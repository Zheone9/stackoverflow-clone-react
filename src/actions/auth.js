import { getSocket } from "../socket/socket";
import { types } from "../types/types";
import axios from "axios";

const APIURL = import.meta.env.VITE_REACT_API_URL;

export const logoutUser = () => {
  return {
    type: types.userLoggedOut,
  };
};

export const login = ({ uid, username, picture, reputation }) => {
  return {
    type: types.userLoggedIn,
    payload: {
      username,
      uid,
      picture,
      reputation,
    },
  };
};

export const setPreviousPage = (previousPage) => ({
  type: types.setPreviousPage,
  payload: previousPage,
});

export const startLoginUsernamePassword = (username, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${APIURL}/auth`,
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );

      dispatch(login(response.data.payload));
      dispatch(getFriendList(response.data.payload.friendList));
      return { success: true, errorMsg: null };
    } catch (error) {
      return { success: false, errorMsg: error.response.data.message };
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
        {
          withCredentials: true,
        }
      );
      dispatch(login(response.data.payload));
      dispatch(getFriendList(response.data.payload.friendList));
      return true;
    } catch (error) {
      // dispatch({ type: LOGIN_WITH_GOOGLE_FAILURE, payload: error.response.data.message });
      return false;
    }
  };
};

const getFriendList = (friendList) => ({
  type: types.getFriendList,
  payload: friendList,
});

export const startRegisterWithEmail = (username, email, password) => {
  return async (dispatch) => {
    try {
      console.log(username, email, password);
      const response = await axios.post(
        `${APIURL}/auth/new`,
        {
          username,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(login(response.data.payload));
      dispatch(getFriendList(response.data.payload.friendList));
      return {
        success: true,
        errorMsg: null,
      };
    } catch (error) {
      // dispatch({ type: LOGIN_WITH_GOOGLE_FAILURE, payload: error.response.data.message });

      return {
        success: false,
        errorMsg: error.response.data.message,
      };
    }
  };
};

export const startHandleLogout = () => {
  return async (dispatch) => {
    try {
      // Llamar al endpoint de deslogueo de la API para eliminar la cookie JWT
      const response = await axios.post(`${APIURL}/auth/logout`, null, {
        withCredentials: true,
      });
      if (response.status === 200) {
        console.log("Logout successful");
        dispatch(logoutUser());
        dispatch(purgeFriendState());

        return true;
      }
    } catch (error) {
      console.error("Error during logout:", error);
      return false;
    }
  };
};

const purgeFriendState = () => ({
  type: types.purgeFriendState,
});
