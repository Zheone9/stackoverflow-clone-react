import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingScreen from "../LoadingScreen";
import { useDispatch, useSelector } from "react-redux";
import useModal from "../../hooks/useModal";
import Modal from "react-modal";
import ModalDialogLogin from "../modals/ModalDialogLogin";
import { getCustomStyles } from "./modalStyles";
import clsx from "clsx";
import {
  startAcceptFriendRequest,
  startAddFriend,
  startCancelFriendRequest,
  startRemoveFriend,
} from "../../actions/user";
import axios from "axios";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const UserProfile = () => {
  const { username } = useParams();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userSentFriendRequest = useSelector((state) =>
    state.user.friendRequestsReceived.filter(
      (friend) => friend.username === username
    )
  );

  const isAlreadyFriend = useSelector(
    (state) =>
      state.user.friendList.filter((friend) => friend.username === username)
        .length
  );

  const APIURL = import.meta.env.VITE_REACT_API_URL;
  const dispatch = useDispatch();
  const [userProfile, setUserProfile] = useState(null);
  const { isModalOpen, openModal, closeModal } = useModal();
  const usernameLogged = useSelector((state) => state.auth.user?.username);
  const [isFriend, setIsFriend] = useState(false);
  const [sentFriendRequest, setSentFriendRequest] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const buttonText = sentFriendRequest
    ? "Request sent"
    : isFriend
    ? "Remove friend"
    : userSentFriendRequest.length > 0
    ? "Accept friend request"
    : "Add friend";

  useEffect(() => {
    if (isAlreadyFriend > 0) setIsFriend(true);
  }, [isAlreadyFriend]);

  const handleAddFriend = async () => {
    if (!isAuthenticated) {
      openModal();
      return;
    }

    if (sentFriendRequest) {
      await dispatch(startCancelFriendRequest(username));
      setSentFriendRequest(false);
      return;
    }
    if (isFriend) {
      await dispatch(startRemoveFriend(username));
      setIsFriend(false);
      setSentFriendRequest(false);
      return;
    }

    if (userSentFriendRequest.length > 0) {
      await dispatch(startAcceptFriendRequest(username));
      setIsFriend(true);
      return;
    }

    dispatch(startAddFriend(username));
    setSentFriendRequest(true);
  };

  const handleReport = () => {
    if (!isAuthenticated) {
      openModal();
      return;
    }
  };
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `${APIURL}/users/get-user/${username}`
        );
        setUserProfile(response.data.payload);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    const fetchData = async () => {
      if (isAuthenticated) {
        try {
          const [
            isFriendResponse,
            sentFriendRequestResponse,
          ] = await Promise.all([
            axios.get(`${APIURL}/users/is-friend/${username}`, {
              withCredentials: true,
            }),
            axios.get(`${APIURL}/users/check-friend-request/${username}`, {
              withCredentials: true,
            }),
          ]);

          setIsFriend(isFriendResponse.data.isFriend);
          setSentFriendRequest(
            sentFriendRequestResponse.data.friendRequestSent
          );
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        setIsFriend(false);
        setSentFriendRequest(false);
      }
    };

    const fetchDataAndProfile = async () => {
      await fetchUserProfile();
      await fetchData();
      setIsLoading(false);
    };

    fetchDataAndProfile();
  }, [isAuthenticated, username]);

  if (isLoading) {
    return <LoadingScreen color={"#0a95ff"} />;
  }

  if (!isLoading && !userProfile) {
    return <h1>User not found</h1>;
  }

  return (
    <div className="div-container-userImage-profile">
      <Modal
        className={"animate animate__animated animate__fadeInUp"}
        isOpen={isModalOpen}
        style={getCustomStyles()}
        onRequestClose={closeModal}
        contentLabel="Iniciar sesión"
      >
        <ModalDialogLogin closeModal={closeModal} />
      </Modal>
      <div
        className="div-userImage"
        style={{
          backgroundImage: `url(${userProfile.picture})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="div-user-info">
        <h3>{userProfile.username}</h3>
        <div className="div-username-reputation">
          <div
            className="div-userReputation"
            style={{
              backgroundImage:
                "url(https://res.cloudinary.com/dzxhdnqm4/image/upload/v1692245839/moneda-realista-dolares_1692-75_woh8kb.webp)",
              backgroundSize: "cover",
            }}
          ></div>
          <p>{userProfile.reputation}</p>
        </div>
        {usernameLogged !== userProfile.username ? (
          <div className="buttons-profile">
            <button
              className={clsx("btn-add-friend-request", {
                "sent-friend-request": sentFriendRequest || isFriend,
                "class-accept-friend-request": userSentFriendRequest.length > 0,
              })}
              onClick={handleAddFriend}
            >
              <TransitionGroup>
                <CSSTransition key={buttonText} timeout={500} classNames="fade">
                  <span style={{ minWidth: "120px" }}>{buttonText}</span>
                </CSSTransition>
              </TransitionGroup>
            </button>
            <button className="btn-report" onClick={() => handleReport()}>
              Report
            </button>
          </div>
        ) : null}
        <div className="div-joinDate-profile">
          <p className="p-joinDate-profile">Join Date</p>
          <p className="p-date-profile">
            {new Date(userProfile.joinDate).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
