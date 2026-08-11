import UserRegister from "../models/Users.js";
import bcrypt from "bcrypt";

const ResetPassword = async (req, res) => {
  const { mobileNumber, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await UserRegister.findOne({ mobileNumber });
    console.log("User found:", user); // Log the user object for debugging

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      user.password = hashedPassword;
      await user.save();

      res.status(200).json({ message: "Password reset successfully" });
    }
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default ResetPassword;
