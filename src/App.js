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
  apiKey: "Sign up for API KEY"
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
      imageUrl: "",
      box: {} // will hold the data targets to calcualte and plot
    };
  }

  calculateFaceLocation = data => {
    // eslint-disable-next-line no-unused-vars
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    // Need to manipulate DOM first
    const image = document.getElementById("input-image");
    const width = Number(image.width); // take the width returned and make it a number
    const height = Number(image.height);
    // by gettiung the width and height, we can work on getting the boxing-box indicators and drawing the box
    console.log(width, height); // getting the rendered image's width and height;
  };

  onInputChange = event => {
    // this should update the event component equal to the input
    // console.log(event.target.value);
    this.setState({ input: event.target.value }); // set state equal to the value of input
  };

  // run Clarifia Api documentation
  onButtonSubmit = () => {
    // console.log("The Detect Button was clicked");    **
    this.setState({ imageUrl: this.state.input }); // imageUrl updated to whatever the input is
    app.models
      .predict(
        // takes the model and the input/picture to detect
        Clarifai.FACE_DETECT_MODEL,
        this.state.input
      )
      .then(response => this.calculateFaceLocation(response))
      // console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
      .catch(err => console.log(err));
  };
  // there was an error

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
        {/* passing imageUrl as a prop */}
        <FaceRecognition imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
