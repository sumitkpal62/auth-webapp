import React from "react";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../config/firebaseConfig";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";

const OauthButton = () => {
  const dispatch = useDispatch();
  const handleOnClick = async (event) => {
    event.preventDefault();
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const userDetails = {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      };
      const res = await axios.post("/api/auth/google", userDetails);
      const data = await res.data;
      dispatch(signInSuccess(data));
    } catch (error) {
      console.log("Could not login with google", error);
    }
  };
  return (
    <button
      onClick={handleOnClick}
      className="border text-white border-red-600 w-1/2 self-center p-2 rounded bg-red-600 hover:bg-red-500 disabled:bg-red-300"
    >
      Continue with Google
    </button>
  );
};

export default OauthButton;
