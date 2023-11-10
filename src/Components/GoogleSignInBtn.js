import React from "react";
import "./googlesignin.css";
import firebase from "../Firebase/firebaseConfig";
import { useUser } from "../Context/UserContext";
import { useHistory } from "react-router-dom";
import { postUserData } from "../api/api";

// import { signinwithgoogle } from "../Firebase/firebaseConfig";
const GoogleSignInBtn = () => {
  const history = useHistory();
  const { user, updateUser } = useUser();
  console.log(user);
  const googleSignIN = async (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();

    try {
      const result = await firebase.auth().signInWithPopup(provider);
      const userD = result.user;
      const name = userD.displayName;
      const email = userD.email;
      const img = userD.photoURL;
      const mobile = userD.phoneNumber;

      console.log(userD, "data received");

      updateUser({ name, email, img, mobile }, () => {
        // Log the updated user information
        console.log(user);
      });

      console.log("Successfully signed in with Google");
      postUserData({ name, email, img, mobile });

      history.push("/otp-verification");
      window.location.reload();
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
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
