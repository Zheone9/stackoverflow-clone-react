import { types } from "../types/types";
import axios from "axios";

const APIURL = import.meta.env.VITE_REACT_API_URL;

export const upvoteEntry = (id) => ({
  type: types.upvoteEntry,
  payload: {
    id,
  },
});

export const getEntries = (data) => ({
  type: types.getEntries,
  payload: {
    data,
  },
});

export const startGetEntries = (userId) => {
  return async (dispatch) => {
    try {
      const response = await fetchEntries(userId);
      dispatch(getEntries(response.data.questions));
      return {
        success: true,
        errorMsg: null,
      };
    } catch (error) {
      console.error("Error fetching entries:", error);
      return {
        success: false,
        errorMsg: error.response.data.message,
      };
    }
  };
};
const fetchEntries = async (userId) => {
  const config = {
    withCredentials: true,
  };
  console.log(userId);
  const endpoint = `${APIURL}/questions`;
  return axios.post(endpoint, { userId }, config);
};

export const voteEntry = (id, value) => {
  return async (dispatch) => {
    try {
      await axios.patch(
        `${APIURL}/questions/vote`,
        {
          questionId: id,
          vote: value,
        },
        {
          withCredentials: true,
        }
      );
      if (value > 0) {
        dispatch(upvoteEntry(id));
      } else {
        dispatch(downvoteEntry(id));
      }
      return { success: true, statusCode: 200 };
    } catch (e) {
      const statusCode = e.response.status;
      return { success: false, statusCode };
    }
  };
};

export const downvoteEntry = (id) => ({
  type: types.downvoteEntry,
  payload: {
    id,
  },
});

const postEntry = async (values) => {
  const endpoint = `${APIURL}/questions/create`;
  try {
    const config = {
      withCredentials: true,
    };

    return await axios.post(endpoint, values, config);
  } catch (error) {
    console.error("Error in axios.post:", error);
    throw error;
  }
};

export const startNewQuestion = (values) => {
  return async () => {
    try {
      await postEntry(values);
      return true;
    } catch (error) {
      console.error("Error creating entry:", error);
      return false;
    }
  };
};

export const startDeleteQuestion = (uid) => {
  return async (dispatch) => {
    try {
      await deleteEntry(uid);
      dispatch(deleteQuestion(uid));
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };
};

const deleteEntry = async (uid) => {
  const endpoint = `${APIURL}/questions/${uid}`;
  try {
    const config = {
      withCredentials: true,
    };

    return await axios.delete(endpoint, config);
  } catch (error) {
    console.error("Error in axios.delete:", error);
    throw error;
  }
};
const deleteQuestion = (uid) => ({
  type: types.deleteEntry,
  payload: uid,
});
export const setLoading = (isLoading) => ({
  type: types.setLoading,
  payload: isLoading,
});

export const setOptionsClicked = (optionsClicked) => ({
  type: types.setOptionsClicked,
  payload: optionsClicked,
});

export const setNewQuestion = (newQuestion) => ({
  type: types.setNewQuestion,
  payload: newQuestion,
});
