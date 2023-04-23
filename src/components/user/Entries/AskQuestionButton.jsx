import React from "react";

const AskQuestionButton = ({ setnewQuestion }) => {
  const handleClick = () => {
    setnewQuestion(true);
  };
  return (
    <button onClick={() => handleClick()} className="btn btn-primary btn-q">
      Ask question
    </button>
  );
};

export default AskQuestionButton;
