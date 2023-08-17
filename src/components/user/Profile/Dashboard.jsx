import React, { useEffect, useState } from "react";
import ProfileInfo from "./ProfileInfo";
import FriendListComponent from "./FriendListComponent";
import LoadingScreen from "../../LoadingScreen";
import { useSelector } from "react-redux";
import axios from "axios";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const APIURL = import.meta.env.VITE_REACT_API_URL;
  const user = useSelector((state) => state.auth.user);
  const [userProfile, setUserProfile] = useState(null);
  const friendList = useSelector((state) => state.user.friendList);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `${APIURL}/users/get-user/${user.username}`,
          {
            withCredentials: true,
          }
        );
        setUserProfile(response.data.payload);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    const fetchDataAndProfile = async () => {
      await fetchUserProfile();
      setIsLoading(false);
    };
    fetchDataAndProfile();
  }, []);

  if (isLoading) {
    return <LoadingScreen color={"#0a95ff"} />;
  }
  return (
    <div>
      <ProfileInfo userProfile={userProfile} />
      <FriendListComponent friendList={friendList} />
    </div>
  );
};
export default Dashboard;
