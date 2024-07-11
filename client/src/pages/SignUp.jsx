import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import OauthButton from "../components/OauthButton";

const SignUp = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleOnChange = (event) => {
    setUserData({ ...userData, [event.target.id]: event.target.value });
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    registerUser(userData);
  };

  // try new code
  const clearFields = () => {
    setUserData({ username: "", email: "", password: "" });
  };

  const registerUser = async (userData) => {
    const { username, email, password } = userData;
    setLoading(true);
    try {
      const response = await axios.post("/api/auth/signup", {
        username,
        email,
        password,
      });
      toast.success(response.data.message);
    } catch (error) {
      const respondedData = error.response.data;
      toast.error(respondedData.message);
    } finally {
      setLoading(false);
      clearFields();
    }
  };

  return (
    <div className="flex flex-col m-auto min-w-[400px] max-w-[500px] border border-blue-500 rounded-md mt-10 h-[70vh] shadow-lg shadow-blue-600">
      <div>
        <h1 className="text-center pb-2 text-3xl mt-3 font-bold border-b-[1px] border-blue-500">
          Sign Up
        </h1>
      </div>
      <form onSubmit={handleOnSubmit} className="flex flex-col gap-3 p-3 mt-6">
        <input
          className="outline-blue-500 border p-2 rounded w-1/2 m-auto"
          type="text"
          placeholder="Username"
          id="username"
          onChange={handleOnChange}
          value={userData.username}
        />
        <input
          className="outline-blue-500 border p-2 rounded w-1/2 m-auto"
          type="email"
          placeholder="Email"
          id="email"
          onChange={handleOnChange}
          value={userData.email}
        />
        <input
          className="outline-blue-500 border p-2 rounded w-1/2 m-auto"
          type="password"
          placeholder="Password"
          id="password"
          onChange={handleOnChange}
          value={userData.password}
        />
        <button
          disabled={loading}
          className="border text-white border-blue-600 w-1/2 self-center p-2 rounded bg-blue-600 hover:bg-blue-500 disabled:bg-blue-300"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
        <OauthButton />
      </form>
      <div className="text-center p-[10px]">
        <p>
          Have an account?{" "}
          <Link to={"/signin"}>
            <span className="text-blue-800 cursor-pointer">Sign In</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
