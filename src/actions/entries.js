import { types } from "../types/types";
import axios from "axios";
import { addNewEntry } from "./auth";

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

// export const startGetEntries = (isAuthenticated) => {
//   return async (dispatch) => {
//     let response;
//     try {
//       if (isAuthenticated) {
//         const token = localStorage.getItem("token");
//         response = await axios.get(`${API_BASE_URL}/questions`, {
//           headers: {
//             "x-access-token": token,
//           },
//         });
//         console.log(response.data.modifiedQuestions);
//         dispatch(getEntries(response.data.modifiedQuestions));
//       } else {
//         response = await axios.get(
//           "http://192.168.101.7:8080/api/questions/public"
//         );
//         dispatch(getEntries(response.data.questions));
//       }
//     } catch (error) {
//       Promise.reject(error);
//     }
//   };
// };

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
      }
    : {};

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
  const token = localStorage.getItem("token");
  const config = {
    headers: { "x-access-token": token },
  };
  const endpoint = `${APIURL}/questions/create`;

  try {
    return await axios.post(endpoint, values, config);
  } catch (error) {
    console.error("Error in axios.post:", error);
    throw error;
  }
};

export const startNewQuestion = (values) => {
  console.log(values);
  return async (dispatch) => {
    try {
      const response = await postEntry(values);
      dispatch(addNewEntry(response.data));
    } catch (error) {
      console.error("Error creating entry:", error);
    }
  };
};
