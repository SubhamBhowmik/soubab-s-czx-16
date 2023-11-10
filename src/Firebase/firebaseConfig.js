import firebase from "firebase/app";
import "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyDis73ER6KoEswkmO4-rhN1pTOZitmUQnE",
  authDomain: "myappjune123.firebaseapp.com",
  databaseURL: "https://myappjune123-default-rtdb.firebaseio.com",
  projectId: "myappjune123",
  storageBucket: "myappjune123.appspot.com",
  messagingSenderId: "284349433370",
  appId: "1:284349433370:web:247fe8255caedb4e3af3a3",
  measurementId: "G-88R3L4N2VJ",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
