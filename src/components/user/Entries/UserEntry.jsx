import React from "react";
import UserInfo from "./UserInfo";
import VotesCounter from "./VotesCounter";
import calculateDifference from "../../../helpers/entries/calculateDateDifference";
import BasicMenu from "./BasicMenu";
import { useSelector } from "react-redux";

const UserEntry = ({ entry, setOptionsClicked, isAuthenticaded }) => {
  const date = calculateDifference(entry.createdAt);
  const userId = useSelector((state) => state.auth.user && state.auth.user.uid);

  const renderBasicMenu = () => {
    if (isAuthenticaded) {
      return (
        <BasicMenu
          setOptionsClicked={setOptionsClicked}
          questionUid={entry.uid}
          userId={userId}
          authorId={entry.author.uid}
        />
      );
    }
    return null;
  };

  return (
    <div className=" mb-5">
      <div className="div-questionTitle">
        <h1>{entry.title}</h1>
        {renderBasicMenu()}
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
