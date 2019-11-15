import React, { Component } from "react";
import Particles from "react-particles-js";
import Clarifai from "clarifai";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import "./App.css";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";

const app = new Clarifai.App({
  apiKey: "NOT FOR SHOW"
});

const particlesOptions = {
  particles: {
    number: {
      value: 90,
      dentsity: {
        enable: true,
        value_area: 800
      }
    }
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "" // Now I need to change the current, preloaded url, to 'imageUrl'.
    };
  }

  onInputChange = event => {
    console.log(event.target.value);
  };

  /*
* app.models
* .predict(
* Clarifai.FACE_DETECT_MODEL,
*     // URL
*     "https://samples.clarifai.com/metro-north.jpg"
* )
* .then(function(response) {
*     // do something with response console.log(response);
*     },
*     function(err) {// there was an error}
* );

*/

  // What to happen when user submits? Need to run the clarifia api documentation.
  onButtonSubmit = () => {
    console.log("The Detect Button was clicked");
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        "a403429f2ddf4b49b307e318f00e528b",
        "https://samples.clarifai.com/face-det.jpg"
      )
      .then(
        function(response) {
          console.log(response);
        },
        function(err) {
          // there was an error
        }
      );
  };

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition />
      </div>
    );
  }
}

export default App;

/*
Starting components:
  - Navigation      - COMPLETED
  - Logo            - COMPLETED
  - Rank            - COMPLETED
  - ImageLinkForm   - READY (adding state)
  - FaceRecognition 
*/
