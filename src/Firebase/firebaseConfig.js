// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { signOut } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getStorage } from "firebase/storage";

import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAd7lw8EJXo1V2Q25Rmyp13fabbXx0xeZk",
  authDomain: "czx-16-2cf81.firebaseapp.com",
  projectId: "czx-16-2cf81",
  storageBucket: "czx-16-2cf81.appspot.com",
  messagingSenderId: "253343353792",
  appId: "1:253343353792:web:a8d27eb38a9d44ea731625",
  measurementId: "G-Y96VP56L7Z",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const provider = new GoogleAuthProvider();

export const signinwithgoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      const name = user.displayName;
      const email = user.email;
      const img = user.photoURL;
      const mobile = user.phoneNumber; // This assumes you have phone number linked to the Google account.

      console.log(name, email, img, mobile);

      // Store the user's information in Firestore
      setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
        img: img,
        mobile: mobile,
      })
        .then(() => {
          console.log("User data saved in Firestore");
        })
        .catch((error) => {
          console.error("Error saving user data in Firestore:", error);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
export const handleSignOut = () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
};
export { auth };
