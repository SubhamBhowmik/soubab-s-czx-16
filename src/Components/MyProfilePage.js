import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navbar";
import { useUser } from "../Context/UserContext";

const MyProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showprofile, setshowprofile] = useState(false);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [image, setimage] = useState(null);

  const { user } = useUser();
  if (user) {
    setshowprofile(true);
    setEmail(user.email);
    setName(user.name);
    setPhone(user.mobile);
    setimage(user.img);
  }

  console.log(user);
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // Add logic to save changes, e.g., make an API call
  };

  return (
    <>
      <Navbar />
      {showprofile ? (
        <div className="mt-4">
          <div className="card mx-auto" style={{ maxWidth: "400px" }}>
            <div className="card-body text-center">
              <img
                src={image}
                alt="Profile"
                className="rounded-circle mb-3"
                width="150"
              />
              {isEditing ? (
                <>
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    type="text"
                    className="form-control mb-3"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </>
              ) : (
                <>
                  <h5 className="card-title">{name}</h5>
                  <p className="card-text">Email: {email}</p>
                  <p className="card-text">Phone: {phone}</p>
                </>
              )}
              {isEditing ? (
                <button className="btn btn-primary" onClick={handleSaveClick}>
                  Save Changes
                </button>
              ) : (
                <button className="btn btn-primary" onClick={handleEditClick}>
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>no user exist</div>
      )}
    </>
  );
};

export default MyProfilePage;
