import axios from "axios";
const firebaseUrl = "https://myappjune123-default-rtdb.firebaseio.com";
const usersCollection = "users";

export const postUserData = async (data) => {
  console.log(data, "data ");
  try {
    console.log(data);
    const response = await axios.post(
      `${firebaseUrl}/${usersCollection}.json`,
      data
    );

    console.log("User data posted successfully:", response.data);
    return response;
  } catch (error) {
    console.error("Error posting user data:", error);
  }
};
