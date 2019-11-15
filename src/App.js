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
  apiKey: "1854d61699964a4a87f01b705361447f"
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
      imageUrl: "" // the imageUrl needs to updated and displayed when user clicks 'onButtonSubmit'
    };
  }

  onInputChange = event => {
    // this should update the event component equal to the input
    // console.log(event.target.value);
    this.setState({ input: event.target.value }); // so now we can get the value of the input entered.
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
    // console.log("The Detect Button was clicked");    **
    this.setState({ imageUrl: this.state.input }); // set the state equal to have imageUrl updated with whatever is input. This allows us to pass it to imageRecognition.
    app.models
      .predict(
        // Clarifai.FACE_DETECT_MODEL,
        Clarifai.COLOR_MODEL,
        // "https://samples.clarifai.com/face-det.jpg"
        this.state.input
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
        {/* By passing the imageUrl in below, we can now use it in the FaceRecognition.js and set it equal to 
        the imageUrl */}
        <FaceRecognition imageUrl={this.state.imageUrl} />
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
