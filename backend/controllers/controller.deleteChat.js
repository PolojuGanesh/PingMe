import UserRegister from "../models/Users.js";

const DeleteChat = async (req, res) => {
  try {
    const { ownId, userId } = req.body;

    if (!ownId || !userId) {
      return res.status(400).json({
        success: false,
        message: "Both ownId and userId are required",
      });
    }

    const deleteChat = await UserRegister.findByIdAndUpdate(ownId, {
      $pull: {
        contacts: {
          userId: userId,
        },
      },
    });

    if (!deleteChat) {
      return res.status(404).json({
        success: false,
        message: "User not found or chat does not exist",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error occurred while deleting user",
      error: error.message,
    });
  }
};

export default DeleteChat;
