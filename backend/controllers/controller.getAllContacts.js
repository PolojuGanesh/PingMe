import UserRegister from "../models/Users.js";

const GetAllContacts = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const user = await UserRegister.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const contactIds = user.contacts.map((contact) => contact.userId);

    const allContacts = await UserRegister.find({
      _id: { $in: contactIds },
    });

    return res.status(200).json({
      success: true,
      contacts: allContacts,
    });
  } catch (error) {
    console.error("GetAllContacts error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default GetAllContacts;
