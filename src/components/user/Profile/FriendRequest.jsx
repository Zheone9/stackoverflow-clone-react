import { useDispatch } from "react-redux";
import {
  startAcceptFriendRequest,
  startDeclineFriendRequest,
} from "../../../actions/user";
import { Link } from "react-router-dom";

const FriendRequest = ({ friend }) => {
  const dispatch = useDispatch();
  const handleAcceptFriendRequest = () => {
    console.log(friend.username);
    dispatch(startAcceptFriendRequest(friend.username));
  };
  const handleRejectFriendRequest = () => {
    dispatch(startDeclineFriendRequest(friend.username));
  };

  return (
    <div className="div-container-userImage-profile-fr">
      <div
        className="div-userImage-fr"
        style={{
          backgroundImage: `url(${friend.picture})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="div-user-info-fr">
        <Link className="link-friend-request" to={`/user/${friend.username}`}>
          {friend.username}
        </Link>
        <div className="div-username-reputation"></div>
        <div className="buttons-profile">
          <button
            className="btn-add-friend"
            onClick={() => handleAcceptFriendRequest()}
          >
            Accept
          </button>
          <button
            className="btn-report"
            onClick={() => handleRejectFriendRequest()}
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default FriendRequest;
