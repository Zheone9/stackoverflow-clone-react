import React, { useEffect, useState } from "react";
import ProfileInfo from "./ProfileInfo";
import FriendListComponent from "./FriendListComponent";
import LoadingScreen from "../../LoadingScreen";
import { useSelector } from "react-redux";
import axios from "axios";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const APIURL = import.meta.env.VITE_REACT_API_URL;
  const [friends, setFriends] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const [userProfile, setUserProfile] = useState(null);

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

    const fetchFriendList = async () => {
      try {
        const response = await axios.get(`${APIURL}/users/get-friendList`, {
          withCredentials: true,
        });
        setFriends(response.data.friendList);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    const fetchDataAndProfile = async () => {
      await fetchUserProfile();
      await fetchFriendList();
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
      <FriendListComponent friendList={friends} />
    </div>
  );
};
export default Dashboard;
