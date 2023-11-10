import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import firebase from "../Firebase/firebaseConfig";
import "./otp.css";
import { useHistory } from "react-router-dom";
import Navbar from "./Navbar";
import { useUser } from "../Context/UserContext";
import { postUserData } from "../api/api";

const OtpVerification = () => {
  const history = useHistory();
  const [isNumberTaken, setIsNumberTaken] = useState(false);
  const [mobile, setMobile] = useState("");
  const [phone, setPhone] = useState("");
  const [finalPhone, setFinalPhone] = useState("");
  const [otp, setOtp] = useState("");
  const { user, updateUser } = useUser();

  const handleChange = (e) => {
    setMobile(e.target.value);
  };

  const handleChangeOTP = (e) => {
    setOtp(e.target.value);
  };

  const configureCaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          onSignInSubmit();
          console.log("reCAPTCHA verified");
        },
        defaultCountry: "IN",
      }
    );
  };

  const onSignInSubmit = (e) => {
    e.preventDefault();
    configureCaptcha();
    const phoneNumber = "+91" + mobile;

    if (phoneNumber.startsWith("+") && phoneNumber.length >= 12) {
      setPhone(
        phoneNumber.substr(0, 3) +
          "XXXXXXXX" +
          phoneNumber.substr(phoneNumber.length - 2)
      );
    }

    const appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        console.log("OTP has been sent");
        setIsNumberTaken(true);
        setFinalPhone(phoneNumber);
      })
      .catch((error) => {
        console.error("SMS not sent:", error);
        localStorage.clear();
        alert("Please Try Again");
      });
  };

  const onSubmitOTP = async (e) => {
    e.preventDefault();

    try {
      const result = await window.confirmationResult.confirm(otp);
      const resUser = result.user;
      console.log(JSON.stringify(resUser));

      updateUser({ mobile: finalPhone }, () => {
        console.log(user, "updated from OTP verification");
      });

      alert("User is verified");
    } catch (error) {
      console.error("Error during OTP verification:", error);
    }
  };
  const [redirect, setRedirect] = useState(false);
  const [reload, setReload] = useState(false);
  const submitData = async () => {
    try {
      if (user && user.mobile !== null) {
        const res = await postUserData(user);
        console.log(res, "response after posting user");
        setRedirect(true);
      }
    } catch (error) {
      console.error("Error posting user data:", error);
    }
  };

  useEffect(() => {
    submitData();
  }, [user]);

  return (
    <>
      <Navbar />

      {!isNumberTaken ? (
        <div className="d-flex justify-content-center align-items-center container">
          <div className="card py-5 px-3">
            <h5 className="m-0">OTP Verification</h5>
            <span className="mobile-text mt-2">Enter the phone number</span>

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
            <div className="d-flex flex-row mt-3"></div>
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center container">
          <div className="card py-5 px-3 shadow ripple">
            <h5 className="m-0">Mobile phone verification</h5>
            <span className="mobile-text mt-2">
              Enter the code we just sent to your mobile phone{" "}
              <b className="text-danger">{phone}</b>
            </span>
            <div className="mt-5 d-flex justify-content-center">
              <form onSubmit={onSubmitOTP}>
                <div id="sign-in-button"></div>

                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                      +91
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control shadow"
                    name="otp"
                    value={otp}
                    placeholder="Enter OTP"
                    required
                    aria-label="otp"
                    aria-describedby="basic-addon1"
                    onChange={handleChangeOTP}
                  />
                </div>
                <div className="d-flex justify-content-center py-5">
                  <button
                    className="text-danger cursor center btn btn-light ripple shadow"
                    variant="contained"
                    sx={{ width: "240px", marginTop: "20px" }}
                    type="submit"
                  >
                    Verify
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OtpVerification;
