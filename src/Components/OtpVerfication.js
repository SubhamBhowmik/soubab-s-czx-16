import React, { useState } from "react";

import "./otp.css";
import firebase, { auth } from "../Firebase/firebaseConfig";
import Navbar from "./Navbar";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  PhoneAuthProvider,
} from "firebase/auth";

const OtpVerfication = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isnumbertaken, setisnumbertaken] = useState(false);

  return (
    <>
      <Navbar />

      {!isnumbertaken ? (
        <div class=" d-flex justify-content-center align-items-center container">
          <div class="card py-5 px-3 ">
            <h5 class="m-0">OTP Verification</h5>
            <span class="mobile-text mt-2">Enter the phone number</span>

            <form>
              <input
                class="form-control"
                autofocus=""
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <button
                type="submit"
                variant="contained"
                sx={{ width: "240px", marginTop: "20px" }}
              >
                Send Code
              </button>
              <div id="recaptcha-container"></div>
            </form>
            <div class="d-flex flex-row mt-3"></div>
          </div>
        </div>
      ) : (
        <div class=" d-flex justify-content-center align-items-center container">
          <div class="card py-5 px-3 ">
            <h5 class="m-0">Mobile phone verification</h5>
            <span class="mobile-text">
              Enter the code we just send on your mobile phone{" "}
              <b class="text-danger">2654+894+</b>
            </span>
            <div class="d-flex flex-row mt-5">
              <input type="text" class="form-control" />
              <input type="text" class="form-control" />
              <input type="text" class="form-control" />
              <input type="text" class="form-control" />
            </div>
            <div class="text-center mt-5">
              <span class="d-block mobile-text">Don't receive the code?</span>
              <span class="font-weight-bold text-danger cursor">Resend</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OtpVerfication;
