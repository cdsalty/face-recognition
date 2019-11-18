import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, box }) => {
  // destructured imageUrl and box
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
        />
        <div
          className="bounding-box"
          style={{
            top: box.topRow,
            right: box.rightCol,
            bottom: box.bottomRow,
            left: box.leftCol
          }}
        ></div>
      </div>
    </div>
  );
};

export default FaceRecognition;
