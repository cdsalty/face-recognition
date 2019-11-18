import React from "react";

const FaceRecognition = ({ imageUrl }) => {
  // destructured imageUrl
  // console.log("check", imageUrl);
  return (
    <div className="center ma">
      <div className="absolute mt3 mb5">
        <img
          id="input-image"
          alt=""
          src={imageUrl}
          width="500px"
          height="auto"
        ></img>
      </div>
    </div>
  );
};

export default FaceRecognition;
