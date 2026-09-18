import bcrypt from "bcrypt";
import UserRegister from "../models/Users.js";

const RegisterUser = async (req, res) => {
  try {
    const { mobileNumber, username, password } = req.body;

    // check all fields are provided
    if (!mobileNumber || !username || !password) {
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
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export default RegisterUser;
