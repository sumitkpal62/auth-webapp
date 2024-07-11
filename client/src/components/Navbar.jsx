import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="bg-gray-400 p-2 m-1 rounded shadow-md">
      <div className="flex justify-between w-11/12 m-auto items-center">
        <Link to={"/"}>
          <div className="font-bold border border-blue-600 p-1 rounded-md">
            Auth{" "}
            <span className="bg-blue-600 inline-block h-max pl-2 pr-2 text-white rounded-md">
              WebApp
            </span>
          </div>
        </Link>
        <ul className="flex gap-4 items-center">
          <Link to={"/"}>
            <li>Home</li>
          </Link>
          <Link to={"/about"}>
            <li>About</li>
          </Link>
          {currentUser ? (
            <Link to={"/profile"}>
              <img
                className="h-7 w-7 rounded-full object-cover"
                src={currentUser.userData.userPhoto}
                alt={"Profile Image"}
              />
            </Link>
          ) : (
            <>
              <Link to={"/signup"}>
                <li className="pl-3 pr-3 pt-1 pb-1 bg-blue-600 rounded-full text-white">
                  Sign Up
                </li>
              </Link>
              <Link to={"/signin"}>
                <li className="pl-3 pr-3 pt-1 pb-1 text-blue-600 rounded-full bg-white border border-blue-600 hover:bg-blue-600 hover:text-white transition duration-400">
                  Sign In
                </li>
              </Link>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
