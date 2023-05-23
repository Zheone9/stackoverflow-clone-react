import axios from "axios";
import { types } from "../types/types.js";

const APIURL = import.meta.env.VITE_REACT_API_URL;

export const changeUsername = (username) => {
  return {
    type: types.changeUsername,
    payload: {
      username,
    },
  };
};

export const startChangeUsername = (newUsername) => {
  return async (dispatch) => {
    try {
      const response = await axios.patch(
        `${APIURL}/account/change-username`,
        {
          newUsername,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response);
      dispatch(changeUsername(newUsername));
      return { success: true, errorMsg: null, statusCode: 200 };
    } catch (e) {
      const statusCode = e.response.status;
      return {
        success: false,
        errorMsg: null,
        statusCode,
      };
    }
  };
};

export const startSetUsername = (username) => {
  return async (dispatch) => {
    try {
      const response = await axios.patch(
        `${APIURL}/account/set-username`,
        {
          username,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response);
      dispatch(changeUsername(username));
      return { success: true, errorMsg: null };
    } catch (e) {
      return { success: false, errorMsg: e.response.data.message };
    }
  };
};
