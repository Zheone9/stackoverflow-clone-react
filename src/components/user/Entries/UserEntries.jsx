import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setLoading,
  setNewQuestion,
  setOptionsClicked,
  startGetEntries,
} from "../../../actions/entries";
import EntriesList from "./EntriesList";
import NewEntry from "./NewEntry";
import useModal from "../../../hooks/useModal.js";
import Modal from "react-modal";
import {
  getCustomStyles,
  getCustomStylesRegisterUsername,
} from "../modalStyles.js";
import ModalSetUsername from "../../modals/ModalSetUsername.jsx";
import {
  selectUserId,
  selectUsername,
} from "../../../helpers/header/selectUsername.js";

const UserEntries = () => {
  const { entries, isLoading, optionsClicked, newQuestion } = useSelector(
    (state) => state.userEntries
  );
  const isAuthenticaded = useSelector((state) => state.auth.isAuthenticated);
  const username = useSelector(selectUsername);
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);
  const { isModalOpen, openModal, closeModal } = useModal();
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
    console.log(username);
    if (username === null && isAuthenticaded === true) {
      openModal();
    }
  }, []);
  useEffect(() => {
    console.log(optionsClicked);
  }, [optionsClicked]);

  useEffect(() => {
    const loadEntries = async () => {
      await dispatch(startGetEntries(userId));
      dispatch(setLoading(false));
    };
    loadEntries();
  }, [isAuthenticaded, dispatch]);

  return (
    <main>
      <Modal
        isOpen={isModalOpen}
        style={getCustomStylesRegisterUsername()}
        onRequestClose={closeModal}
        contentLabel="Set username"
        shouldCloseOnOverlayClick={false}
      >
        <ModalSetUsername closeModal={closeModal} />
      </Modal>
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
