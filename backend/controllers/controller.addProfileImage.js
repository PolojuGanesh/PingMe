import cloudinary from "../config/cloudinary.js";
import UserRegister from "../models/Users.js";

const AddProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No image uploaded",
      });
    }

    // const profileImage = req.file.filename;
    const { userId } = req.body;

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "PingMe/ProfileImages",
    });

    const updateUser = await UserRegister.findByIdAndUpdate(
      userId,
      {
        $set: {
          profileImage: result.secure_url,
        },
      },
      { new: true },
    );

    if (!updateUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Profile image added successfully",
      user: {
        id: updateUser._id,
        mobileNumber: updateUser.mobileNumber,
        username: updateUser.username,
        profileImage: updateUser.profileImage,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export default AddProfileImage;
