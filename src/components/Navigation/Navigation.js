import React from "react";

const Navigation = ({ onRouteChange, isSignedIn }) => {
  // created the if (isSignedIn) first during thought process as a state value... then I could compare against it.
  // Next, create the state value for 'isSignedIn';
  // After that, I will need to better define the functionality of "onRouteChange"
  if (isSignedIn) {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p
          onClick={() => onRouteChange("signout")}
          className="f3 link dim black underline pa3 pointer"
        >
          signOut?
        </p>
      </nav>
    );
  } else {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p
          onClick={() => onRouteChange("signin")}
          className="f3 link dim black underline pa3 pointer"
        >
          signin?
        </p>

        <p
          onClick={() => onRouteChange("register")}
          className="f3 link dim black underline pa3 pointer"
        >
          register?
        </p>
      </nav>
    );
  }
};

export default Navigation;
