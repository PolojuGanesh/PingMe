import React from "react";
import { useState, useContext } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookies";
import { useNavigate, Navigate } from "react-router-dom";
import { Context } from "../context/Context";
import { assets } from "../../assets/assets";

const Login = () => {
  const [userData, setUserData] = useState({
    mobileNumber: "",
    password: "",
  });

  const [resetPassword, setResetPassword] = useState(false);

  const { apiUrl, jwtToken, setJwtToken, setUserDetails } = useContext(Context);

  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUserData((userData) => ({ ...userData, [name]: value }));
  };

  const urlEndpoint = resetPassword ? "/reset-password" : "/login";
  const urlMethod = resetPassword ? "PATCH" : "POST";

  const formHandler = async (event) => {
    event.preventDefault();

    const url = `${apiUrl}${urlEndpoint}`;

    const options = {
      method: urlMethod,
      body: JSON.stringify(userData),
      headers: { "Content-Type": "application/json" },
    };

    const response = await fetch(url, options);
    const responseData = await response.json();

    if (resetPassword) {
      if (response.ok) {
        toast.success(`${responseData.message}`);
        setResetPassword(false);
        setUserData({ mobileNumber: "", password: "" });
      } else {
        toast.error(`${responseData.message}`);
      }
    } else {
      if (response.ok) {
        setJwtToken(responseData.token);
        setUserDetails(responseData.user);
        toast.success(`${responseData.message}`);
        Cookies.setItem("jwt_token", responseData.token, { expires: 1 });
        Cookies.setItem("user", JSON.stringify(responseData.user), {
          expires: 1,
        });
        navigate("/main-home");
      } else {
        toast.error(`${responseData.message}`);
      }
    }
  };

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
          {resetPassword ? "Reset Password" : "Login to Your Account"}
        </h1>
        <form
          onSubmit={formHandler}
          className="flex flex-col justify-center items-center gap-1 pb-10"
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
                htmlFor="passcode"
                className="font-medium text-gray-500 text-medium"
              >
                Password
              </label>
              <input
                type="password"
                id="passcode"
                placeholder="Enter Password"
                minLength="8"
                className="p-2 border outline-0 rounded-sm font-semibold text-black"
                required
                name="password"
                onChange={onChangeHandler}
                value={userData.password}
              />
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white rounded-full mt-3 w-full text-center p-2 cursor-pointer"
              type="submit"
            >
              {resetPassword ? "Reset Password" : "Login"}
            </button>
          </div>
          {resetPassword ? (
            <></>
          ) : (
            <p className="text-sm text-gray-500 font-bold mt-4">
              Create a new account?{" "}
              <span
                onClick={() => navigate("/register")}
                className="text-orange-500 hover:underline cursor-pointer"
              >
                Click here
              </span>
            </p>
          )}
          {resetPassword ? (
            <p className="text-sm text-gray-500 font-bold mt-4">
              Login to your account?{" "}
              <span
                onClick={() => {
                  navigate("/login");
                  setResetPassword(false);
                }}
                className="text-orange-500 hover:underline cursor-pointer"
              >
                Login here
              </span>
            </p>
          ) : (
            <p className="text-sm text-gray-500 font-bold pt-0">
              Reset your password?{" "}
              <span
                onClick={() => {
                  setResetPassword(true);
                  setUserData({ mobileNumber: "", password: "" });
                }}
                className="text-red-500 hover:underline cursor-pointer"
              >
                Click here
              </span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
