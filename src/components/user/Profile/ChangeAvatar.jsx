import React from "react";
import DropZone from "./DropZone";

const ChangeAvatar = ({ avatar, setAvatar }) => {
  return (
    <div className="mt-5 center-div">
      <div className="div-container-userImage">
        <div
          className="div-userImage"
          style={{
            backgroundImage: `url(${avatar})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <DropZone setAvatar={setAvatar} />
      </div>
    </div>
  );
};

export default ChangeAvatar;
