import React, { Component } from "react";
import Particles from "react-particles-js";
import Clarifai from "clarifai";
import Navigation from "./components/Navigation/Navigation";
import SignIn from "./components/SignIn/SignIn";
import Logo from "./components/Logo/Logo";
import "./App.css";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";

const app = new Clarifai.App({
  apiKey: "Sign up for API key"
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
  // CALCULATE FACE NEEDS TO RETURN AN OBJECT WITH END POINTS OF THE FACE BOX
  calculateFaceLocation = data => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    // Need to manipulate DOM first
    const image = document.getElementById("input-image");
    // need the image width and height to calculate the different corners of the face
    const width = Number(image.width); // use Number() to take the returned value and make it a number
    const height = Number(image.height);
    // by gettiung the width and height, we can determine the bounding_box
    // console.log(width, height); // getting the rendered image's width and height;
    return {
      // MUST return an object for the key value pairs to show where the dots on the page should be
      leftCol: clarifaiFace.left_col * width, // left_col is the percentage of the width.
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height
    };
  };

  // create a function to take a value and set it equal to the state's new box value
  // box = the returned value of calculateFaceLocation
  // displayFaceBox will call calculateFaceLocation as the box parameter in the response onSubmit
  displayFaceBox = box => {
    console.log(box); // the box endpoints are listed correctly.
    this.setState({ box: box });
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
      ) // take the response, pass it into calculateFaceLocation in order to display the face box
      .then(response =>
        this.displayFaceBox(this.calculateFaceLocation(response))
      )
      // console.log(response.outputs[0].data.regions[0].region_info.bounding_box); // this will be used inside the function, calculateFaceLocation
      .catch(err => console.log(err));
  };
  // there was an error

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation />
        <SignIn />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        {/* passing box and imageUrl as a prop to the FaceRecognition Component*/}
        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
