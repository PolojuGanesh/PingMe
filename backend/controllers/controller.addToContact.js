import UserRegister from "../models/Users.js";

const AddToContact = async (req, res) => {
  try {
    const { userId, ownId } = req.body;

    const updateUser = await UserRegister.findByIdAndUpdate(
      ownId,
      {
        $addToSet: {
          contacts: {
            userId: userId,
          },
        },
      },
      { new: true },
    );

    if (!updateUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User added to contacts",
      user: updateUser,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export default AddToContact;
