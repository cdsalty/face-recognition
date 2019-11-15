import React from "react";

const FaceRecognition = ({ imageUrl }) => {
  // destructured imageUrl
  return (
    <div className="center">
      <img alt="" src={imageUrl}></img>
    </div>
  );
};

export default FaceRecognition;
