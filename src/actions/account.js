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
export const uploadProfilePicture = (base64Picture) => {
  return async (dispatch) => {
    try {
      const formData = new FormData();

      // Probablemente quieras hacer esto en una función separada
      const base64Response = await fetch(base64Picture);
      const blob = await base64Response.blob();

      formData.append("image", blob, "file.png"); // elige el nombre de archivo y la extensión que necesites

      const response = await axios.post(
        `${APIURL}/account/upload-profile-picture`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response);

      dispatch({
        type: types.uploadProfilePicture,
        payload: {
          picture: response.data.payload.picture,
        },
      });

      return { success: true, errorMsg: null };
    } catch (e) {
      return { success: false, errorMsg: e.response.data.message };
    }
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
