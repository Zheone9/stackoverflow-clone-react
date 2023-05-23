import React from "react";
import UserInfo from "./UserInfo";
import VotesCounter from "./VotesCounter";
import calculateDifference from "../../../helpers/entries/calculateDateDifference";
import OptionsMenuEntry from "./OptionsMenuEntry.jsx";
import { useSelector, useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import FlagIcon from "@mui/icons-material/Flag";
import { startDeleteQuestion } from "../../../actions/entries.js";
import { selectPicture } from "../../../helpers/header/selectUsername.js";

const UserEntry = ({ entry, setOptionsClicked, isAuthenticaded }) => {
  const date = calculateDifference(entry.createdAt);
  const userId = useSelector((state) => state.auth.user && state.auth.user.uid);
  const dispatch = useDispatch();
  const picture = useSelector(selectPicture);
  const handleDeleteQuestion = async () => {
    await dispatch(startDeleteQuestion(entry.uid));
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
        <UserInfo author={entry.author} date={entry.date} picture={picture} />
      </div>
    </div>
  );
};

export default UserEntry;
