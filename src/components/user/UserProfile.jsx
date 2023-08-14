import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingScreen from "../LoadingScreen";

const UserProfile = () => {
  const { username } = useParams();
  const APIURL = import.meta.env.VITE_REACT_API_URL;
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
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
    <div className="text-center">
      {userProfile.username}
      <div className="div-container-userImage">
        <div
          className="div-userImage"
          style={{
            backgroundImage: `url(${userProfile.picture})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      </div>
      <p>Join date: {new Date(userProfile.joinDate).toLocaleDateString()}</p>
      <p> Reputation: {userProfile.reputation}</p>
    </div>
  );
};

export default UserProfile;
