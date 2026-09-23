import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserRegister from "../models/Users.js";

const LoginUser = async (req, res) => {
  try {
    const { mobileNumber, password } = req.body;

    // check all fields are provided
    if (!mobileNumber || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    // check user has prev registered or not
    const isMobileNumberExists = await UserRegister.findOne({
      mobileNumber,
    }).select("+password");
    if (isMobileNumberExists) {
      const isPasswordMatched = await bcrypt.compare(
        password,
        isMobileNumberExists.password,
      );
      if (isPasswordMatched) {
        const payload = { mobileNumber };
        const token = jwt.sign(payload, "My_Token");
        return res.status(200).json({
          success: true,
          message: "Login successfull",
          token,
          user: {
            id: isMobileNumberExists._id,
            mobileNumber: isMobileNumberExists.mobileNumber,
            username: isMobileNumberExists.username,
            profileImage: isMobileNumberExists.profileImage,
          },
        });
      } else {
        return res.status(401).json({
          success: false,
          message: "Invalid password",
        });
      }
    } else {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export default LoginUser;
