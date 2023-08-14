import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingScreen from "../LoadingScreen";
import { useSelector } from "react-redux";
import useModal from "../../hooks/useModal";
import Modal from "react-modal";
import ModalDialogLogin from "../modals/ModalDialogLogin";
import { getCustomStyles } from "./modalStyles";
import clsx from "clsx";

const UserProfile = () => {
  const { username } = useParams();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const APIURL = import.meta.env.VITE_REACT_API_URL;
  const [userProfile, setUserProfile] = useState(null);
  const { isModalOpen, openModal, closeModal } = useModal();
  const usernameLogged = useSelector((state) => state.auth.user.username);
  const [isFriend, setIsFriend] = useState(false);
  const [sentFriendRequest, setSentFriendRequest] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const handleAddFriend = () => {
    if (!isAuthenticated) {
      openModal();
      return;
    }
    if (sentFriendRequest) return;
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
        const response = await fetch(`${APIURL}/users/${username}`);
        const data = await response.json();
        setUserProfile(data.payload);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [username]);

  if (isLoading) {
    return <LoadingScreen color={"#0a95ff"} />;
  }

  if (!userProfile) {
    return <div>User not found</div>;
  }

  console.log(userProfile.picture);
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
                "url(https://res.cloudinary.com/dzxhdnqm4/image/upload/v1691991971/moneda-realista-dolares_1692-75_1_yuujys.avif)",
              backgroundSize: "cover",
            }}
          ></div>
          <p>{userProfile.reputation}</p>
        </div>
        {usernameLogged !== userProfile.username ? (
          <div className="buttons-profile">
            <button
              className={clsx("btn-add-friend", {
                "sent-friend-request": sentFriendRequest,
              })}
              onClick={() => handleAddFriend()}
            >
              {sentFriendRequest
                ? "Request sent"
                : isFriend
                ? "Friend"
                : "Add friend"}
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
