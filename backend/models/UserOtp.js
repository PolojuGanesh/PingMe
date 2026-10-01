import mongoose from "mongoose";

const userOtpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  otp: {
    type: String,
    required: [true, "OTP is required"],
  },
  expiresAt: {
    type: Date,
    expires: 0, // This will automatically delete the document after the specified time
  },
});

const UserOtp = mongoose.model("UserOtp", userOtpSchema);
export default UserOtp;
