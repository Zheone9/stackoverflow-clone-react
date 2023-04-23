import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  downvoteEntry,
  upvoteEntry,
  voteEntry,
} from "../../../actions/entries";
import Modal from "react-modal";
import useModal from "../../../hooks/useModal";
import ModalDialogLogin from "../../modals/ModalDialogLogin";
import { getCustomStyles } from "../modalStyles";

const VotesCounter = ({ votesNumber, id, voted = 0 }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  useEffect(() => {
    if (!isAuthenticated) {
      if (btnUpvote.current.classList.contains("green")) {
        btnUpvote.current.classList.remove("green");
      }
      if (btnDownvote.current.classList.contains("red")) {
        btnDownvote.current.classList.remove("red");
      }
    } else {
      if (voted === 1) {
        btnUpvote.current.classList.add("green");
      } else if (voted === -1) {
        btnDownvote.current.classList.add("red");
      }
    }
  }, [isAuthenticated]);

  const dispatch = useDispatch();

  const { isModalOpen, openModal, closeModal } = useModal();
  const [action, setAction] = useState("");

  const btnUpvote = useRef();
  const btnDownvote = useRef();

  const handleDownVote = (e) => {
    if (!isAuthenticated) {
      setAction("downvote");
      openModal();
      return;
    }

    if (btnUpvote.current.classList.contains("green")) {
      btnUpvote.current.classList.remove("green");
    } else {
      e.currentTarget.classList.add("red");
    }
    dispatch(voteEntry(id, -1));
  };
  const handleUpVote = (e) => {
    if (!isAuthenticated) {
      setAction("upvote");
      openModal();
      return;
    }

    if (btnDownvote.current.classList.contains("red")) {
      btnDownvote.current.classList.remove("red");
    } else {
      e.currentTarget.classList.add("green");
    }
    dispatch(voteEntry(id, 1));
  };

  return (
    <div className="div-votesCounter">
      <Modal
        className={"animate animate__animated animate__fadeInUp"}
        isOpen={isModalOpen}
        style={getCustomStyles()}
        onRequestClose={closeModal}
        contentLabel="Iniciar sesión"
      >
        <ModalDialogLogin closeModal={closeModal} action={action} />
      </Modal>
      <div>
        <div className="div-votesCounterUp">
          <i
            className="fa fa-solid fa-caret-up"
            ref={btnUpvote}
            onClick={handleUpVote}
          ></i>
        </div>
        <div
          className="div-votesCounterNumber"
          style={{ color: votesNumber >= 0 ? "#7D7D7D" : "#E25656" }}
        >
          {votesNumber}
        </div>
        <div className="div-votesCounterDown">
          <i
            className="fa fa-solid fa-caret-down"
            ref={btnDownvote}
            onClick={handleDownVote}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default VotesCounter;
