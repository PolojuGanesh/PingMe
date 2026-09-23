import UserRegister from "../models/Users.js";
import bcrypt from "bcrypt";

const ResetPassword = async (req, res) => {
  const { mobileNumber, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await UserRegister.findOne({ mobileNumber });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    } else {
      user.password = hashedPassword;
      await user.save();

      res
        .status(200)
        .json({ success: true, message: "Password reset successfully" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export default ResetPassword;
