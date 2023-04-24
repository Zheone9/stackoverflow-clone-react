import React from "react";
import UserInfo from "./UserInfo";
import VotesCounter from "./VotesCounter";
import calculateDifference from "../../../helpers/entries/calculateDateDifference";

const UserEntry = ({ entry, setOptionsClicked, isAuthenticaded }) => {
  const date = calculateDifference(entry.createdAt);
  return (
    <div className=" mb-5">
      <div className="div-questionTitle">
        <h1>{entry.title}</h1>
        {isAuthenticaded && (
          <i
            className="fa fa-ellipsis-v three-dots-icon"
            aria-hidden="true"
            onClick={() => setOptionsClicked(true)}
          ></i>
        )}
      </div>
      <div className="question-info">
        <p>{date}</p>
      </div>
      <div className="div-questionBody">
        <VotesCounter
          votesNumber={entry.votes}
          id={entry.uid}
          voted={entry.voted}
        />
        <p>{entry.body}</p>
      </div>
      <div className="div-userInfo">
        <UserInfo author={entry.author} date={entry.date} />
      </div>
    </div>
  );
};

export default UserEntry;
