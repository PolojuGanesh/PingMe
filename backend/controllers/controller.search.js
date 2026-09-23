import UserRegister from "../models/Users.js";

const SearchUser = async (req, res) => {
  const { searchQuery } = req.query;

  try {
    if (!searchQuery || !searchQuery.trim()) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const users = await UserRegister.find({
      $or: [
        { username: { $regex: searchQuery, $options: "i" } },
        { mobileNumber: { $regex: searchQuery, $options: "i" } },
      ],
    });
    if (users.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No users found" });
    } else {
      res.status(200).json({ success: true, users });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export default SearchUser;
