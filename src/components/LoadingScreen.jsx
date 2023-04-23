import React from "react";
import { FallingLines } from "react-loader-spinner";

const LoadingScreen = ({ color }) => {
  return (
    <div className="div-center">
      <FallingLines
        color={color}
        width="100"
        visible={true}
        ariaLabel="falling-lines-loading"
      />
    </div>
  );
};

export default LoadingScreen;
