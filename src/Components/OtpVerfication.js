import React, { useState } from "react";
import firebase from "../Firebase/firebaseConfig";
import "./otp.css";
// import firebase, { auth, sendVerfication } from "../Firebase/firebaseConfig";
import Navbar from "./Navbar";

const OtpVerfication = () => {
  const [isnumbertaken, setisnumbertaken] = useState(false);
  const [mobile, setMobile] = useState("");
  const [phone, setphone] = useState("");

  const [otp, setOtp] = useState("");

  const handleChange = (e) => {
    setMobile(e.target.value); // Update the mobile state with the input's value
  };

  const handleChangeOTP = (e) => {
    setOtp(e.target.value); // Update the mobile state with the input's value
  };

  const configureCaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          onSignInSubmit();
          console.log("Recaptca varified");
        },
        defaultCountry: "IN",
      }
    );
  };

  const onSignInSubmit = (e) => {
    e.preventDefault();
    configureCaptcha();
    console.log("Mobile number submitted:", mobile);
    const phoneNumber = "+91" + mobile;
    console.log(phoneNumber);

    if (phoneNumber.startsWith("+") && phoneNumber.length >= 12) {
      setphone(
        phoneNumber.substr(0, 3) +
          " " +
          phoneNumber.substr(phoneNumber.length - 2)
      );
    }

    const appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        console.log("OTP has been sent");
        setisnumbertaken(true);
        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
        console.log("SMS not sent");
      });
  };

  const onSubmitOTP = (e) => {
    e.preventDefault();

    console.log(otp);
    window.confirmationResult
      .confirm(otp)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        console.log(JSON.stringify(user));
        alert("User is verified");
        // ...
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
      });
  };

  return (
    <>
      <Navbar />

      {!isnumbertaken ? (
        <div class=" d-flex justify-content-center align-items-center container">
          <div class="card py-5 px-3 ">
            <h5 class="m-0">OTP Verification</h5>
            <span class="mobile-text mt-2">Enter the phone number</span>

            <form onSubmit={onSignInSubmit}>
              <div id="sign-in-button"></div>
              <input
                type="number"
                name="mobile"
                value={mobile}
                placeholder="Mobile number"
                required
                onChange={handleChange}
              />
              <button
                type="submit"
                variant="contained"
                sx={{ width: "240px", marginTop: "20px" }}
              >
                Send Code
              </button>
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
              <b class="text-danger">{phone}</b>
            </span>
            <div class="d-flex flex-row mt-5">
              <form onSubmit={onSubmitOTP}>
                <div id="sign-in-button"></div>
                <input
                  type="number"
                  name="otp"
                  value={otp}
                  placeholder="Mobile number"
                  required
                  onChange={handleChangeOTP}
                />
                <button
                  type="submit"
                  className="font-weight-bold text-danger cursor"
                  variant="contained"
                  sx={{ width: "240px", marginTop: "20px" }}
                >
                  Verify
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OtpVerfication;
