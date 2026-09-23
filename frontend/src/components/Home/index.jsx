import React, { useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Context } from "../context/Context";
import { assets } from "../../assets/assets";

const Home = () => {
  const navigate = useNavigate();

  const { jwtToken } = useContext(Context);

  if (jwtToken !== null) {
    return <Navigate to="/main-home" replace />;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div
        className="flex flex-col justify-center items-center border border-t-red-500 border-r-blue-500 
        border-b-green-500 border-l-pink-500 w-4/5 h-5/6 p-10 rounded-lg bg-white"
      >
        <img
          src={assets.viewer}
          alt="logo"
          className="h-2/5 w-2/5 mb-4 hidden md:block"
        />
        <img
          src={assets.loginlogo}
          alt="logo"
          className="h-full w-full block md:hidden"
        />
        <h1 className="text-xl text-black tracking-wide mb-3 font-bold text-center md:text-3xl">
          Welcome to PingMe
        </h1>
        <p className="text-gray-600 tracking-wide text-md mb-4 text-center w-1/2 hidden md:block">
          PingMe is a simple and reliable messaging web app that helps you
          connect instantly. Chat in real time with a clean, easy-to-use
          interface.
        </p>
        <p className="text-gray-600 text-md mb-4 text-center block md:hidden">
          PingMe lets you chat instantly with a clean and simple interface.
        </p>
        <div className="flex">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white rounded-full mr-2 w-25 text-center p-2 cursor-pointer"
            type="button"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white rounded-full w-25 text-center p-2 cursor-pointer"
            type="button"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
