import UserRegister from "../models/Users.js";
import bcrypt from "bcrypt";

const ResetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }

    const user = await UserRegister.findOne({ email: email });

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
