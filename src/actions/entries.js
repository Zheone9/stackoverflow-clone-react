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

export const startGetEntries = (isAuthenticated) => {
  return async (dispatch) => {
    try {
      const response = await fetchEntries(isAuthenticated);
      dispatch(
        getEntries(
          isAuthenticated
            ? response.data.modifiedQuestions
            : response.data.questions
        )
      );
    } catch (error) {
      console.error("Error fetching entries:", error);
    }
  };
};
const fetchEntries = async (isAuthenticated) => {
  const token = localStorage.getItem("token");
  const config = isAuthenticated
    ? {
        headers: { "x-access-token": token },
        withCredentials: true,
      }
    : { withCredentials: true };

  const endpoint = isAuthenticated
    ? `${APIURL}/questions`
    : `${APIURL}/questions/public`;
  return axios.get(endpoint, config);
};

export const voteEntry = (id, value) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      await axios.patch(
        `${APIURL}/questions/vote`,
        {
          questionId: id,
          vote: value,
        },
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      if (value > 0) {
        dispatch(upvoteEntry(id));
      } else {
        dispatch(downvoteEntry(id));
      }
    } catch (error) {
      console.log("error");
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
    const token = localStorage.getItem("token");
    const config = {
      headers: { "x-access-token": token },
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
      // dispatch(addNewEntry(response.data));
    } catch (error) {
      console.error("Error creating entry:", error);
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
    const token = localStorage.getItem("token");
    const config = {
      headers: { "x-access-token": token },
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
