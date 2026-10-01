import bcrypt from "bcrypt";
import UserRegister from "../models/Users.js";

const RegisterUser = async (req, res) => {
  try {
    const { mobileNumber, username, email, password } = req.body;

    // check all fields are provided
    if (!mobileNumber || !username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    // check if  mobile number already exists
    const isMobileNumberExists = await UserRegister.findOne({ mobileNumber });
    if (isMobileNumberExists) {
      return res.status(409).json({
        success: false,
        message: "Mobile number already exists",
      });
    }

    // check if username already exists
    const isUsernameExists = await UserRegister.findOne({ username });
    if (isUsernameExists) {
      return res.status(409).json({
        success: false,
        message: "Username already exists",
      });
    }

    const isEmailExists = await UserRegister.findOne({ email });
    if (isEmailExists) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    if (username.length < 7 || username.length > 14) {
      return res.status(400).json({
        success: false,
        message: "Username must be between 7 and 14 characters long",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await UserRegister.create({
      mobileNumber,
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        mobileNumber: user.mobileNumber,
        username: user.username,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default RegisterUser;
