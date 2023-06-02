import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { voteEntry } from "../../../actions/entries";
import Modal from "react-modal";
import useModal from "../../../hooks/useModal";
import ModalDialogLogin from "../../modals/ModalDialogLogin";
import { getCustomStyles } from "../modalStyles";
import { handleLogoutWithPreviousPage } from "../../../helpers/auth/authUtils.js";
import { useNavigate } from "react-router-dom";

const VotesCounter = ({ votesNumber, id, voted = 0 }) => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("Efecto ejecutado, isAuthenticated:", isAuthenticated);
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
  }, [isAuthenticated, voted]);

  const { isModalOpen, openModal, closeModal } = useModal();
  const [action, setAction] = useState("");

  const btnUpvote = useRef();
  const btnDownvote = useRef();

  const handleDownVote = async (e) => {
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

    const { success, statusCode } = await dispatch(voteEntry(id, -1));
    if (!success && statusCode === 401) {
      await handleLogoutWithPreviousPage(dispatch);
      navigate("/auth/login");
    }
  };
  const handleUpVote = async (e) => {
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
    const { success, statusCode } = await dispatch(voteEntry(id, 1));
    if (!success && statusCode === 401) {
      await handleLogoutWithPreviousPage(dispatch);
      navigate("/auth/login");
    }
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
          <p className="p-large">{votesNumber}</p>
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
