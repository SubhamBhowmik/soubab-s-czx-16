import React from "react";
import Navbar from "../../Components/Navbar";
import GoogleSignInBtn from "../../Components/GoogleSignInBtn";

const Welcome = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <GoogleSignInBtn />
        <h5>hiii from welcome</h5>
      </div>
    </>
  );
};

export default Welcome;
