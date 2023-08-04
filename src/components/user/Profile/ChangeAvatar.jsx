import React, { useState } from "react";
import DropZone from "./DropZone";

const ChangeAvatar = ({ avatar, setAvatar, setFileName, fileName }) => {
  const [isInvalidFileType, setIsInvalidFileType] = useState(false);
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
        <div className="d-flex f-column">
          <DropZone
            setAvatar={setAvatar}
            setFileName={setFileName}
            setIsInvalidFileType={setIsInvalidFileType}
            isInvalidFileType={isInvalidFileType}
          />
          <span>{fileName}</span>
          {isInvalidFileType && (
            <p className="p-error-message p-small">
              El tipo de archivo no es válido. Por favor, sube una imagen PNG o
              JPEG.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChangeAvatar;
