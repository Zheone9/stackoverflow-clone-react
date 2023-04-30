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

const UserEntries = () => {
  const { entries, isLoading, optionsClicked, newQuestion } = useSelector(
    (state) => state.userEntries
  );
  const isAuthenticaded = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

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

  useEffect(() => {
    const loadEntries = async () => {
      await dispatch(startGetEntries(isAuthenticaded));
      dispatch(setLoading(false));
    };
    loadEntries();
  }, [isAuthenticaded, dispatch]);

  return (
    <main>
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
