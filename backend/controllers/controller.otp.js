import UserOtp from "../models/UserOtp.js";

const VerifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    const findUserOtp = await UserOtp.findOne({ email });

    if (!findUserOtp) {
      return res.status(404).json({
        success: false,
        message: "User not found for the provided email",
      });
    }

    if (findUserOtp.expiresAt < new Date()) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired",
      });
    }

    if (findUserOtp.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to verify OTP",
    });
  }
};

export default VerifyOtp;
