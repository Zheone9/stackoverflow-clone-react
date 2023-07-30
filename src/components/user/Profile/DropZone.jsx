import React from "react";
import { useDropzone } from "react-dropzone";

const DropZone = ({ setAvatar }) => {
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = () => {
      setAvatar(reader.result);
      console.log(reader.result);
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
    <div className="div-select-image" {...getRootProps()}>
      <input {...getInputProps()} />
      {!isDragActive && (
        <p className="text-gray-400">
          Haz clic aquí o arrastra una imagen para subirla
        </p>
      )}
      {isDragActive && !isDragReject && "Suelta la imagen para subirla"}
      {isDragReject &&
        "El tipo de archivo no es válido. Por favor, sube una imagen PNG o JPEG"}
    </div>
  );
};

export default DropZone;
