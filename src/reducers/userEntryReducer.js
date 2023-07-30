import { types } from "../types/types";

const initialState = {
  entries: [],
  isLoading: true,
  optionsClicked: false,
  newQuestion: false,
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

    case types.deleteEntry:
      return {
        ...state,
        entries: state.entries.filter((entry) => entry.uid !== action.payload),
      };
    case types.setLoading:
      return { ...state, isLoading: action.payload };
    case types.setOptionsClicked:
      return { ...state, optionsClicked: action.payload };
    case types.setNewQuestion:
      return { ...state, newQuestion: action.payload };
    case types.addComment:
      return {
        ...state,
        entries: state.entries.map((entry) =>
          entry.uid === action.payload.id
            ? {
                ...entry,
                comments: [...entry.comments, { ...action.payload.comment }],
              }
            : entry
        ),
      };

    default:
      return state;
  }
};
