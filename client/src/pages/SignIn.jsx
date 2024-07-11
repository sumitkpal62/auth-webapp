import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  signInFailed,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OauthButton from "../components/OauthButton";

const SignIn = () => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const { loading, error, errorDetails } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleOnChange = (event) => {
    setUserData({
      ...userData,
      [event.target.id]: event.target.value,
    });
  };

  const sendData = async ({ username, password }) => {
    try {
      dispatch(signInStart());
      const response = await axios.post("api/auth/signin", {
        username,
        password,
      });
      if (response) {
        toast.success("Sign in successful");
        navigate("/");
        dispatch(signInSuccess(response.data));
      }
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(signInFailed(error.response.data));
    }
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    sendData(userData);
    setUserData({ username: "", password: "" });
    navigate("/signin");
  };

  return (
    <div className="flex flex-col m-auto min-w-[400px] max-w-[500px] border border-blue-500 rounded-md mt-10 h-[70vh] shadow-lg shadow-blue-600">
      <div>
        <h1 className="text-center pb-2 text-3xl mt-3 font-bold border-b-[1px] border-blue-500">
          Sign In
        </h1>
      </div>
      <form className="flex flex-col gap-3 p-3 mt-6" onSubmit={handleOnSubmit}>
        <input
          className="outline-blue-500 border p-2 rounded w-1/2 m-auto"
          type="text"
          placeholder="Username"
          id="username"
          value={userData.username}
          onChange={handleOnChange}
        />
        <input
          className="outline-blue-500 border p-2 rounded w-1/2 m-auto"
          type="password"
          placeholder="Password"
          id="password"
          value={userData.password}
          onChange={handleOnChange}
        />
        <button className="border text-white border-blue-600 w-1/2 self-center p-2 rounded bg-blue-600 hover:bg-blue-500 disabled:bg-blue-300">
          Sign In
        </button>
        <OauthButton />
      </form>

      <div className="text-center p-[10px]">
        <p className="pb-2 text-blue-800 cursor-pointer ">Forgot password?</p>
        <p>
          Don&apos;t have an account?{" "}
          <Link to={"/signup"}>
            <span className="text-blue-800 cursor-pointer">Sign Up</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
