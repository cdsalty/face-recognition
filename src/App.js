import React, { Component } from "react";
import Particles from "react-particles-js";
import Clarifai from "clarifai";
import Navigation from "./components/Navigation/Navigation";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import Logo from "./components/Logo/Logo";
import "./App.css";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";

const app = new Clarifai.App({
  apiKey: "1854d61699964a4a87f01b705361447f"
  // apiKey: "Sign up for API key"
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
      box: {}, // will hold the data targets to calcualte and plot
      route: "signin", // keeps track of where the user is on the page; inital load should be signin
      // for now, anything not equal to signin will not show the signin component.
      // isSignedIn: "false"  // small but crucial error I made.
      isSignedIn: false,
      user: {
        // and copy from whatever we already get for the database
        id: "",
        name: "",
        email: "",
        entries: 0,
        joined: ""
      }
    };
  }

  // create a loadUser function that will load the user details listed above, in the state
  loadUser = data => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    });
  };

  // THE START OF CONNECTING TO THE BACKEND --> anytime we need to connect to outside world, use fetch
  // componentDidMount() {
  //   fetch("http://localhost:3000/") // if you follow this root route, '/', in the server, you see it's returning a list of the users in the database (database.users)
  //     .then(response => response.json())
  //     .then(console.log); // returns a list of current users in created database
  // }  ***** now that it is working correctly, move on for more wins. ******
  // THINK, HOW TO GET THE SIGNIN ENDPOINT TO WORK

  // CALCULATE FACE NEEDS TO RETURN AN OBJECT WITH END POINTS OF THE FACE BOX
  calculateFaceLocation = data => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("input-image");
    const width = Number(image.width); // use Number() to take the returned value and make it a number
    const height = Number(image.height);
    // by gettiung the width and height, we can determine the bounding_box
    return {
      // MUST return an object for the key value pairs to show where the dots on the page should be
      leftCol: clarifaiFace.left_col * width, // left_col is the percentage of the width.
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height
    };
  };

  // create a function to take a value and set it equal to the state's new box value
  displayFaceBox = box => {
    console.log(box); // the box endpoints are listed correctly.
    this.setState({ box: box });
  };

  onInputChange = event => {
    // this should update the event component equal to the input
    // console.log(event.target.value);
    this.setState({ input: event.target.value }); // set state equal to the value of input
  };

  // run Clarifia Api documentation (could also be called ' onPictureSubmit ')
  onButtonSubmit = () => {
    // console.log("The Detect Button was clicked");    **
    this.setState({ imageUrl: this.state.input }); // imageUrl updated to whatever the input is
    app.models
      .predict(
        // takes the model and the input/picture to detect
        Clarifai.FACE_DETECT_MODEL,
        this.state.input
      ) // take the response, pass it into calculateFaceLocation to display box around face
      .then(response => {
        if (response) {
          fetch("http://localhost:3000/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            // back in the server, the only need for the image url is id
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              // used this in order to ONLY update the user object. what about spread operator?
              this.setState(Object.assign(this.state.user, { entries: count }));
              // assign this user the same state AND ONLY UPDATE the user ENTRIES
            });
        }
        this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch(err => console.log(err));
  };

  onRouteChange = route => {
    // this.setState({ route: route }); // the route will be what we give it.
    if (route === "signout") {
      this.setState({ isSignedIn: false });
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  //NEXT, pass to the signin component AS A PROP on the input element with an event handler, onClick = {onRouteChange}

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation
          isSignedIn={isSignedIn} // since it's coming from the state
          onRouteChange={this.onRouteChange} // vs. coming from a function outside the state's scope
        />
        <Logo />
        {route === "home" ? (
          <div>
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            {/* passing box and imageUrl as a prop to the FaceRecognition Component*/}
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </div>
        ) : route === "signin" ? (
          <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        )

        // if the state is signin,  it will display otherwise, it will not show the component
        }
      </div>
    );
  }
}
export default App;
