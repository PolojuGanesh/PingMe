import React from "react";
import { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookies";
import { useNavigate, Navigate } from "react-router-dom";
import { Context } from "../context/Context";
import { assets } from "../../assets/assets";

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [resendTimer, setResendTimer] = useState(90);
  const [showOtp, setShowOtp] = useState(false);
  const [isemailVerified, setIsEmailVerified] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const [resetPassword, setResetPassword] = useState(false);

  const { apiUrl, jwtToken, setJwtToken, setUserDetails } = useContext(Context);

  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUserData((userData) => ({ ...userData, [name]: value }));
    if (name === "email") {
      setEmail(value);
    }
  };

  const urlEndpoint = resetPassword ? "/reset-password" : "/login";
  const urlMethod = resetPassword ? "PATCH" : "POST";

  const sendOtpHandler = async () => {
    try {
      const options = {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" },
      };

      const response = await fetch(`${apiUrl}/send-otp`, options);
      const responseData = await response.json();

      if (response.ok && responseData.success) {
        setResendTimer(90);
        setIsOtpSent(true);
        setShowOtp(true);
        setIsTimerRunning(true);
      } else {
        toast.error(`${responseData.message}`);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const otpVerificationHandler = async () => {
    try {
      const options = {
        method: "POST",
        body: JSON.stringify({ email, otp }),
        headers: { "Content-Type": "application/json" },
      };

      const response = await fetch(`${apiUrl}/verify-otp`, options);
      const responseData = await response.json();

      if (response.ok && responseData.success) {
        setShowOtp(false);
        setIsEmailVerified(true);
        setOtp("");
        toast.success(`${responseData.message}`);
      } else {
        toast.error(`${responseData.message}`);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  const resendOtpHandler = () => {
    sendOtpHandler();
  };

  useEffect(() => {
    if (!isTimerRunning) return;

    let timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerRunning]);

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
    console.log("Response Data:", responseData);

    if (resetPassword) {
      if (response.ok) {
        toast.success(`${responseData.message}`);
        setResetPassword(false);
        setUserData({ email: "", password: "" });
      } else {
        toast.error(`${responseData.message}`);
      }
    } else {
      if (response.ok) {
        setJwtToken(responseData.token);
        setUserDetails(responseData.user);
        toast.success(`${responseData.message}`);
        Cookies.setItem("jwt_token", responseData.token, { expires: 7 });
        Cookies.setItem("user", JSON.stringify(responseData.user), {
          expires: 7,
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
                htmlFor="email"
              >
                Email
              </label>
              <div className="flex gap-1">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter Email"
                  className="p-2 border outline-0 rounded-sm font-semibold text-black flex-grow-1 w-[78%]"
                  autoFocus
                  required
                  onChange={onChangeHandler}
                  value={userData.email}
                />
                {resetPassword && (
                  <button
                    className={`bg-violet-500 hover:bg-violet-700 text-xs p-2 text-white rounded-sm text-center cursor-pointer ${isemailVerified ? "cursor-not-allowed" : "cursor-pointer"}`}
                    type="button"
                    onClick={sendOtpHandler}
                    disabled={isOtpSent}
                  >
                    {isemailVerified ? "Verified" : "Send otp"}
                  </button>
                )}
              </div>
            </div>
            {showOtp && resetPassword && (
              <div className="flex flex-col gap-1">
                <label
                  className="font-medium text-gray-500 text-medium"
                  htmlFor="otp"
                >
                  OTP
                </label>
                <div className="flex gap-1">
                  <input
                    type="text"
                    id="otp"
                    name="otp"
                    placeholder="Enter OTP"
                    className="p-2 flex-grow-1 w-[39%] border outline-0 rounded-sm font-semibold text-black"
                    required
                    onChange={(event) => setOtp(event.target.value)}
                    value={otp}
                  />
                  <button
                    className="bg-purple-500 hover:bg-purple-700 text-xs p-2 text-white rounded-sm text-center cursor-pointer"
                    type="button"
                    onClick={otpVerificationHandler}
                  >
                    Verify otp
                  </button>
                  <button
                    className="bg-orange-500 hover:bg-orange-700 text-xs p-2 text-white rounded-sm text-center cursor-pointer"
                    type="button"
                    onClick={resendOtpHandler}
                    disabled={resendTimer > 0}
                  >
                    {resendTimer > 0
                      ? `Resend otp in ${resendTimer}s`
                      : "Resend otp"}
                  </button>
                </div>
              </div>
            )}
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
              disabled={resetPassword && !isemailVerified}
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
                  setUserData({ email: "", password: "" });
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
