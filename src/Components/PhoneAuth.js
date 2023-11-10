import React from "react";
import { useUser } from "../Context/UserContext";
import { postUserData } from "../api/api";
const PhoneAuth = () => {
  const { user, updateUser } = useUser();
  console.log(JSON.stringify(user));

  return <div>PhoneAuth</div>;
};

export default PhoneAuth;
