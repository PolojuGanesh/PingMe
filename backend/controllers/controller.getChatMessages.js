import Message from "../models/Messages.js";

const GetChatMessages = async (req, res) => {
  try {
    const { currentUserId, selectedUserId } = req.body;

    const messages = await Message.find({
      $or: [
        {
          senderId: currentUserId,
          receiverId: selectedUserId,
        },
        {
          senderId: selectedUserId,
          receiverId: currentUserId,
        },
      ],
    }).sort({ createdAt: 1 });

    return res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default GetChatMessages;
