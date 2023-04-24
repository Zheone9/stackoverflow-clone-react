import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserEntry from "./UserEntry";
import AskQuestionButton from "./AskQuestionButton";
import { startGetEntries } from "../../../actions/entries";
import LoadingScreen from "../../LoadingScreen";
import CreateNewEntry from "./CreateNewEntry";

const UserEntries = () => {
  const { entries } = useSelector((state) => state.userEntries);
  const sortedEntries = [...entries].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  const isAuthenticaded = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [optionsClicked, setOptionsClicked] = useState(false);
  useEffect(() => {
    console.log(optionsClicked);
  }, [optionsClicked]);

  const [newQuestion, setnewQuestion] = useState(false);

  useEffect(() => {
    if (isAuthenticaded) {
      dispatch(startGetEntries(true)).then(() => {
        setIsLoading(false);
      });
    } else {
      dispatch(startGetEntries(false)).then(() => {
        setIsLoading(false);
      });
    }
  }, [isAuthenticaded]);

  return (
    <main>
      <div className="container-entries p-5">
        {newQuestion ? <CreateNewEntry /> : null}
        {isAuthenticaded && !newQuestion ? (
          <div className="div-btn-askQuestion">
            <AskQuestionButton setnewQuestion={setnewQuestion} />
          </div>
        ) : null}
        {isLoading ? (
          <LoadingScreen color={"#0a95ff"} />
        ) : (
          sortedEntries.map((entry) => (
            <UserEntry
              key={entry.uid}
              entry={entry}
              setOptionsClicked={setOptionsClicked}
              isAuthenticaded={isAuthenticaded}
            />
          ))
        )}
      </div>
    </main>
  );
};

export default UserEntries;
