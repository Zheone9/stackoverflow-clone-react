import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

const DropZone = ({ setAvatar, setFileName, setIsInvalidFileType }) => {
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) {
      return;
    }
    const acceptedTypes = ["image/jpeg", "image/png"];
    const fileExtension = file.type.toLowerCase();

    if (!acceptedTypes.includes(fileExtension)) {
      setIsInvalidFileType(true);
      return;
    }

    setIsInvalidFileType(false);

    const reader = new FileReader();

    reader.onload = () => {
      setAvatar(reader.result);
      console.log(reader.result);
      setFileName(file.name);
    };

    reader.readAsDataURL(file);
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png",
  });

  return (
    <div className="div-select-image h-100" {...getRootProps()}>
      <input {...getInputProps()} />
      {!isDragActive && (
        <p className="text-gray-400">
          Haz clic aquí o arrastra una imagen para subirla
        </p>
      )}
      {isDragActive && !isDragReject && <p>Suelta la imagen para subirla</p>}
    </div>
  );
};

export default DropZone;
