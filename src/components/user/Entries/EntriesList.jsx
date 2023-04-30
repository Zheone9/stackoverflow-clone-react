import React from "react";
import LoadingScreen from "../../LoadingScreen";
import UserEntry from "./UserEntry";

const EntriesList = ({
  isLoading,
  sortedEntries,
  isAuthenticaded,
  setOptionsClicked,
}) => {
  if (isLoading) {
    return <LoadingScreen color={"#0a95ff"} />;
  }

  return sortedEntries.map((entry) => (
    <UserEntry
      key={entry.uid}
      entry={entry}
      setOptionsClicked={setOptionsClicked}
      isAuthenticaded={isAuthenticaded}
    />
  ));
};

export default EntriesList;
