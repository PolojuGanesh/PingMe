import React from "react";
import { toast } from "react-toastify";
import { useNavigate, Navigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { Context } from "../context/Context";
import { assets } from "../../assets/assets";

const Register = () => {
  const [userData, setUserData] = useState({
    mobileNumber: "",
    username: "",
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

  const { apiUrl, jwtToken } = useContext(Context);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUserData((userData) => ({ ...userData, [name]: value }));
    if (name === "email") {
      setEmail(value);
    }
  };

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

    const options = {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "Content-Type": "application/json" },
    };

    const registerUrl = `${apiUrl}/register`;

    const response = await fetch(registerUrl, options);
    const responseData = await response.json();

    if (response.ok && responseData.success) {
      setUserData({
        mobileNumber: "",
        username: "",
        email: "",
        password: "",
      });
      toast.success(`${responseData.message}`);

      setShowOtp(false);
      setIsEmailVerified(false);
      setIsOtpSent(false);
      setIsTimerRunning(false);

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
    <div className="flex justify-center items-center min-h-screen bg-gray-100 pt-3 pb-3">
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
                htmlFor="email"
                className="font-medium text-gray-500 text-medium"
              >
                Email
              </label>
              <div className="flex gap-1">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter email"
                  className="p-2 flex-grow-1 w-[78%] border outline-0 rounded-sm font-semibold text-black"
                  required
                  onChange={onChangeHandler}
                  value={userData.email}
                />
                <button
                  className={`bg-violet-500 hover:bg-violet-700 text-xs p-2 text-white rounded-sm text-center cursor-pointer ${isemailVerified ? "cursor-not-allowed" : "cursor-pointer"}`}
                  type="button"
                  onClick={sendOtpHandler}
                  disabled={isOtpSent}
                >
                  {isemailVerified ? "Verified" : "Send otp"}
                </button>
              </div>
            </div>
            {showOtp && (
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="otp"
                  className="font-medium text-gray-500 text-medium"
                >
                  OTP
                </label>
                <div className="flex gap-1">
                  <input
                    type="text"
                    id="otp"
                    name="otp"
                    placeholder="Enter otp"
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
              className={`bg-green-500 hover:bg-green-700 text-white rounded-full mt-3 w-full text-center p-2 ${isemailVerified ? "cursor-pointer" : "cursor-not-allowed"}`}
              type="submit"
              disabled={!isemailVerified}
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
