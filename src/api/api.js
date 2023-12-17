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
    if (response.data) {
      const id = response.data.name;
      return id;
    }
  } catch (error) {
    console.error("Error posting user data:", error);
  }
};

export const getUserData = async (userId) => {
  try {
    // Making a GET request to Firebase Realtime Database for a specific user ID
    const response = await axios.get(
      `${firebaseUrl}/${usersCollection}/${userId}.json`
    );

    console.log("User data retrieved successfully:", response.data);
    return response.data; // Return the user data
  } catch (error) {
    console.error("Error getting user data:", error);
  }
};
