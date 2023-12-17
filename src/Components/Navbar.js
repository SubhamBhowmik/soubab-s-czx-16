import React, { useEffect, useState } from "react";
import { useUser } from "../Context/UserContext";
import ProfileDrawer from "./ProfileDrawer";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getUserData } from "../api/api";
import GoogleSignInBtn from "./GoogleSignInBtn";

const Navbar = () => {
  const { user, profileId } = useUser();
  const [info, setinfo] = useState({
    name: "",
    image: "",
    phone: "",
    email: "",
  });
  const [authenticated, setauthenticated] = useState(false);
  const history = useHistory();
  // console.log(user, "user ");
  console.log(profileId, "profile id");

  let data = null;
  const getUserInfo = async (id) => {
    try {
      data = await getUserData(id);
      console.log(data, "data aisa ");
      setinfo({
        name: data.name,
        image: data.img,
        email: data.email,
        phone: data.mobile,
      });
      setauthenticated(true);
    } catch (error) {
      console.log(error, "data aya noh from navbar");
    }
  };

  useEffect(() => {
    // Check if user exists and has a mobile property
    if (user && user.mobile !== null && profileId) {
      getUserInfo(profileId);
    }
  }, [profileId]);
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <div className="" id="">
            <a className="navbar-brand mt-2 mt-lg-0" href="#">
              <img
                src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
                height="15"
                alt="MDB Logo"
                loading="lazy"
              />
            </a>
          </div>

          <div className="d-flex align-items-center">
            <a className="text-reset me-3" href="#">
              <i className="fas fa-shopping-cart"></i>
            </a>

            <div className="dropdown">
              <a
                className="text-reset me-3 dropdown-toggle hidden-arrow"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-mdb-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fas fa-bell"></i>
                <span className="badge rounded-pill badge-notification bg-danger">
                  1
                </span>
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  <a className="dropdown-item" href="#">
                    Some news
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another news
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </div>
            {authenticated ? (
              <>
                <div
                  id="profile"
                  class="navbar-toggler"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasDarkNavbar"
                  aria-controls="offcanvasDarkNavbar"
                  aria-expanded="false"
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
                          <img
                            src={info.img}
                            alt=""
                            style={{ borderRadius: "50%" }}
                          />
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
              </>
            ) : (
              <div className="dropdown">
                <a
                  className="dropdown-toggle d-flex align-items-center hidden-arrow"
                  href="#"
                  id="navbarDropdownMenuAvatar"
                  role="button"
                  data-mdb-toggle="dropdown"
                  aria-expanded="false"
                >
                  Login
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navbarDropdownMenuAvatar"
                >
                  <li>
                    <a className="dropdown-item" href="#">
                      <GoogleSignInBtn />
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
