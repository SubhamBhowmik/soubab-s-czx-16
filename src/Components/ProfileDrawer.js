import React from "react";
import { useUser } from "../Context/UserContext";
import GoogleSignInBtn from "./GoogleSignInBtn";
const ProfileDrawer = () => {
  const { user } = useUser();
  const data = JSON.stringify(user);

  const info = {
    name: "Subham Bhowmik",
    email: "czsubham@gmail.com",
    img: "https://lh3.googleusercontent.com/a/ACg8ocJ7KKHvxpn8ujvO-bh-0Vgd5dThRlaghN99uSpX-ZaQVp4=s96-c",
    mobile: "98768999",
  };

  return (
    <>
      <nav class="navbar navbar-dark bg-dark fixed-top">
        <div
          class="navbar-toggler"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasDarkNavbar"
          aria-controls="offcanvasDarkNavbar"
          aria-label="Toggle navigation"
        >
          <div>clcik here </div>
        </div>
        <div
          class="offcanvas offcanvas-end text-bg-dark"
          tabindex="-1"
          id="offcanvasDarkNavbar"
          aria-labelledby="offcanvasDarkNavbarLabel"
        >
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasDarkNavbarLabel">
              Welcome {info.name}
            </h5>
            <button
              type="button"
              class="btn-close btn-close-white"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div class="offcanvas-body">
            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li>
                <div class="d-flex justify-content-center rounded-circle">
                  <img src={info.img} alt="" style={{ borderRadius: "50%" }} />
                </div>
              </li>
              <li class="nav-item">
                <div class="nav-link " aria-current="page" href="#">
                  Email : {info.email}
                </div>
              </li>
              <li class="nav-item">
                <div class="nav-link" href="#">
                  Contact No: {info.mobile}
                </div>
              </li>
            </ul>
            <button class="btn btn-success" type="submit">
              Edit
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default ProfileDrawer;
