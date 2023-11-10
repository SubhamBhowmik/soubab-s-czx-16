import React from "react";
import { useUser } from "../Context/UserContext";
import GoogleSignInBtn from "./GoogleSignInBtn";
const ProfileDrawer = () => {
  const { user } = useUser();
  const data = JSON.stringify(user);

  return (
    <>
      {/* <img
        src={user.img}
        alt=""
        className="rounded-circle"
        height={25}
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasRight"
        aria-controls="offcanvasRight"
      /> */}

      <div class="btn-group dropleft">
        <div
          class="dropdown-toggle"
          data-toggle="dropdown"
          aria-haspopup="false"
          aria-expanded="false"
        >
          Login
        </div>
        <div class="dropdown-menu">
          <GoogleSignInBtn />
        </div>
      </div>
    </>
  );
};

export default ProfileDrawer;
