const User = require("../models/User");
const Post = require("../models/Post"); 
const Category = require("../models/Category"); 

// Get logged-in user profile
exports.getProfileData = async (req, res) => {
  try {
    // user id coming from auth middleware
    const userId = req.user.id;

   const user = await User.findById(userId)
  .populate("savedPosts")
  .populate("categories").select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      user
    });

  } catch (error) {
    console.error("Get Profile Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};