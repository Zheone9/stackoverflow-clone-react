import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setLoading,
  setNewQuestion,
  setOptionsClicked,
  startGetEntries,
} from "../../../actions/entries";
import EntriesList from "./EntriesList";
import NewEntry from "./NewEntry";
import { useNavigate } from "react-router-dom";

const UserEntries = () => {
  const { entries, isLoading, optionsClicked, newQuestion } = useSelector(
    (state) => state.userEntries
  );
  const isAuthenticaded = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sortedEntries = [...entries].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  const handleSetNewQuestion = (value) => {
    dispatch(setNewQuestion(value));
  };

  const handleSetOptionsClicked = (value) => {
    dispatch(setOptionsClicked(value));
  };

  useEffect(() => {
    console.log(optionsClicked);
  }, [optionsClicked]);

  const [error, setError] = useState(null);

  useEffect(() => {
    const loadEntries = async () => {
      const { success, errorMsg } = await dispatch(
        startGetEntries(isAuthenticaded)
      );
      dispatch(setLoading(false));

      if (isAuthenticaded && !success) {
        console.log(errorMsg);
        // return navigate("/auth/login")
      }
      if (!success) {
        setError(errorMsg);
      }
    };
    loadEntries();
  }, [isAuthenticaded, dispatch]);

  return (
    <main>
      {error}
      <div className="container-entries p-5">
        <NewEntry
          newQuestion={newQuestion}
          isAuthenticaded={isAuthenticaded}
          setnewQuestion={handleSetNewQuestion}
        />
        <EntriesList
          isLoading={isLoading}
          sortedEntries={sortedEntries}
          isAuthenticaded={isAuthenticaded}
          setOptionsClicked={handleSetOptionsClicked}
        />
      </div>
    </main>
  );
};

export default UserEntries;
