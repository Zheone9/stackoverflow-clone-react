import { types } from "../types/types";

const initialState = {
  entries: [],
};
export const userEntryReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.upvoteEntry:
      return {
        ...state,
        entries: state.entries.map((entry) =>
          entry.uid === action.payload.id
            ? { ...entry, votes: entry.votes + 1 }
            : entry
        ),
      };

    case types.addNewEntry:
      return {
        ...state,
        entries: [...state.entries, { ...action.payload }],
      };

    case types.downvoteEntry:
      return {
        ...state,
        entries: state.entries.map((entry) =>
          entry.uid === action.payload.id
            ? { ...entry, votes: entry.votes + -1 }
            : entry
        ),
      };

    case types.getEntries:
      return {
        ...state,
        entries: action.payload.data,
      };
    default:
      return state;
  }
};
