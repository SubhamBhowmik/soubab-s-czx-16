import React from "react";
import "./googlesignin.css";
import { signinwithgoogle } from "../Firebase/firebaseConfig";
const GoogleSignInBtn = () => {
  const googleSignIN = (e) => {
    e.preventDefault();
    signinwithgoogle();
  };

  return (
    <>
      {/* google-sign-in-button */}
      <div className="google-icon-wrapper d-flex">
        <div className="google-icon-wrapper">
          <img
            className="google-icon"
            src="../images/google-icon.png"
            alt="Google Sign-In"
          />
        </div>
        <button className="google-button" onClick={googleSignIN}>
          Sign in with Google
        </button>
      </div>
    </>
  );
};

export default GoogleSignInBtn;
