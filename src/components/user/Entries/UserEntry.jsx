import React, { useState } from "react";
import UserInfo from "./UserInfo";
import VotesCounter from "./VotesCounter";
import calculateDifference from "../../../helpers/entries/calculateDateDifference";
import OptionsMenuEntry from "./OptionsMenuEntry.jsx";
import { useSelector, useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import FlagIcon from "@mui/icons-material/Flag";
import {
  startAddComment,
  startDeleteQuestion,
} from "../../../actions/entries.js";
import { selectPicture } from "../../../helpers/header/selectUsername.js";
import EntryComment from "./EntryComment";

const UserEntry = ({ entry, setOptionsClicked, isAuthenticaded }) => {
  const date = calculateDifference(entry.createdAt);
  const [newComment, setNewComment] = useState(false);
  const userId = useSelector((state) => state.auth.user && state.auth.user.uid);
  const dispatch = useDispatch();
  const picture = useSelector(selectPicture);
  const handleDeleteQuestion = async () => {
    await dispatch(startDeleteQuestion(entry.uid));
  };

  const submitComment = async (entryId, comment) => {
    await dispatch(startAddComment(entryId, comment));
  };

  const menuItems = [
    {
      text: "Delete question",
      Icon: DeleteIcon,
      iconStyle: {
        color: "red", // Cambia el color del ícono
        fontSize: "1.7rem", // Cambia el tamaño del ícono
      },
      onClick: () => handleDeleteQuestion(),
      condition: (authorId, userId) => authorId === userId,
    },
    {
      text: "Report question",
      Icon: FlagIcon,
      onClick: () => {
        console.log("Report question clicked");
      },
    },
  ];

  const renderBasicMenu = () => {
    if (isAuthenticaded) {
      return (
        <OptionsMenuEntry
          setOptionsClicked={setOptionsClicked}
          userId={userId}
          authorId={entry.author.uid}
          menuItems={menuItems}
        />
      );
    }
    return null;
  };

  return (
    <div className="mb-5">
      <div className="div-questionTitle">
        <h2>{entry.title}</h2>
        {renderBasicMenu()}
      </div>
      <div className="question-info">
        <p className="p-small">{date}</p>
      </div>
      <div className="div-questionBody">
        <VotesCounter
          votesNumber={entry.votes}
          id={entry.uid}
          voted={entry.voted}
        />
        <p className="p-medium">{entry.body}</p>
      </div>
      <div className="div-userInfo">
        <UserInfo author={entry.author} date={entry.date} picture={picture} />
      </div>
      <div className="entry-comments">
        <ul>
          <li>
            <hr />
            <div>
              <p>
                {entry.comments.length > 0 ? (
                  entry.comments.map((comment) => (
                    <div key={comment.uid} className="div-comment">
                      <p className="comment-body">{comment.body}</p>
                      <p className="comment-author">
                        - {comment.user.username}
                      </p>
                      <p>Created at: {comment.createdAt}</p>
                      <hr />
                    </div>
                  ))
                ) : (
                  <p className="comment-body">No comments yet</p>
                )}
              </p>
              {isAuthenticaded && !newComment && (
                <p className="p-newComment" onClick={() => setNewComment(true)}>
                  Add Comment
                </p>
              )}
            </div>
          </li>
        </ul>
      </div>

      {isAuthenticaded && newComment && (
        <EntryComment submitComment={submitComment} entryId={entry.uid} />
      )}
    </div>
  );
};

export default UserEntry;
