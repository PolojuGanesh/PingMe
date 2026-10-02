import { sendEmail } from "../utils/sendEmail.js";
import UserOtp from "../models/UserOtp.js";

const SendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // generates 5 digit otp
    const otp = Math.floor(10000 + Math.random() * 90000);

    // Save OTP to the database with an expiration time of 5 minutes
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now

    await UserOtp.findOneAndUpdate(
      { email },
      { otp, expiresAt },
      { upsert: true, new: true },
    );

    await sendEmail({
      to: email,
      subject: "PingMe Email Verification",
      text: `Your PingMe verification OTP is ${otp} expires in 5 minutes.`,
    });

    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default SendOtp;
