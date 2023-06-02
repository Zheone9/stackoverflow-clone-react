import React, { useEffect, useState } from "react";
import AskQuestionButton from "./AskQuestionButton";
import CreateNewEntry from "./CreateNewEntry";

const NewEntry = ({ newQuestion, isAuthenticaded, setnewQuestion }) => {
  if (newQuestion && isAuthenticaded) {
    return <CreateNewEntry />;
  }
  if (isAuthenticaded) {
    return (
      <div className="div-btn-askQuestion">
        <AskQuestionButton setnewQuestion={setnewQuestion} />
      </div>
    );
  }
  return null;
};
export default NewEntry;
