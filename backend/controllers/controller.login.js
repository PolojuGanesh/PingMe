import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserRegister from "../models/Users.js";

const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check all fields are provided
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    // check user has prev registered or not
    const isEmailExists = await UserRegister.findOne({
      email: email,
    }).select("+password");
    if (isEmailExists) {
      const isPasswordMatched = await bcrypt.compare(
        password,
        isEmailExists.password,
      );
      if (isPasswordMatched) {
        const payload = { email: isEmailExists.email, id: isEmailExists._id };
        const token = jwt.sign(payload, "My_Token");
        return res.status(200).json({
          success: true,
          message: "Login successfull",
          token,
          user: {
            id: isEmailExists._id,
            mobileNumber: isEmailExists.mobileNumber,
            email: isEmailExists.email,
            username: isEmailExists.username,
            profileImage: isEmailExists.profileImage,
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
