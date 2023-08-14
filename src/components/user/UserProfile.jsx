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
    <div className="div-container-userImage-profile">
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
        <div className="buttons-profile">
          <button className="btn-add-friend">Add friend</button>
          <button className="btn-report">Report</button>
        </div>

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
