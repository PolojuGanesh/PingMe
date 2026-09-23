import React from "react";
import { toast } from "react-toastify";
import { useNavigate, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import { Context } from "../context/Context";
import { assets } from "../../assets/assets";

const Register = () => {
  const [userData, setUserData] = useState({
    mobileNumber: "",
    username: "",
    password: "",
  });

  const { apiUrl, jwtToken } = useContext(Context);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUserData((userData) => ({ ...userData, [name]: value }));
  };

  const formHandler = async (event) => {
    event.preventDefault();

    const options = {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "Content-Type": "application/json" },
    };

    const registerUrl = `${apiUrl}/register`;

    const response = await fetch(registerUrl, options);
    const responseData = await response.json();

    if (response.ok) {
      setUserData({
        mobileNumber: "",
        username: "",
        password: "",
      });
      toast.success(`${responseData.message}`);
      navigate("/login");
    } else {
      toast.error(`${responseData.message}`);
    }
  };

  const navigate = useNavigate();

  if (jwtToken !== null) {
    return <Navigate to="/main-home" replace />;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div
        className="border border-t-red-500 border-r-blue-500 
        border-b-green-500 border-l-pink-500 md:w-2/5 md:h-5/6 md:p-5 rounded-lg bg-white w-11/12 h-11/12"
      >
        <div className="flex justify-center">
          <img
            src={assets.loginlogo}
            alt="logo"
            className="h-2/4 w-2/4"
            onClick={() => navigate("/")}
          />
        </div>
        <h1 className="text-xl text-black tracking-wide mb-3 font-bold text-center md:text-xl">
          Create Your Account
        </h1>
        <form
          onSubmit={formHandler}
          className="flex flex-col justify-center items-center gap-5 pb-10"
        >
          <div className="flex flex-col md:w-4/6 gap-3 w-10/12">
            <div className="flex flex-col gap-1">
              <label
                className="font-medium text-gray-500 text-medium"
                htmlFor="phone"
              >
                Mobile Number
              </label>
              <input
                type="tel"
                id="phone"
                name="mobileNumber"
                placeholder="Enter Mobile Number"
                pattern="[0-9]{10}"
                maxlength="10"
                inputmode="numeric"
                className="p-2 border outline-0 rounded-sm font-semibold text-black"
                autoFocus
                required
                onChange={onChangeHandler}
                value={userData.mobileNumber}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                className="font-medium text-gray-500 text-medium"
                htmlFor="username"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter Username"
                className="p-2 border outline-0 rounded-sm font-semibold text-black"
                required
                onChange={onChangeHandler}
                value={userData.username}
                minLength="7"
                maxLength="14"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="passcode"
                className="font-medium text-gray-500 text-medium"
              >
                Password
              </label>
              <input
                type="password"
                id="passcode"
                name="password"
                placeholder="Enter Password"
                minlength="8"
                className="p-2 border outline-0 rounded-sm font-semibold text-black"
                required
                onChange={onChangeHandler}
                value={userData.password}
              />
            </div>
            <button
              className="bg-green-500 hover:bg-green-700 text-white rounded-full mt-3 w-full text-center p-2 cursor-pointer"
              type="submit"
            >
              Register
            </button>
          </div>
          <p className="text-sm text-gray-500 font-bold">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-orange-500 hover:underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
