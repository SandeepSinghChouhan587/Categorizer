const Post = require("../models/Post");
const { getYoutubeData } = require("../services/youtubeService");
const { getInstagramData } = require("../services/instagramService");
const { categorizeContent } = require("../services/categorizeService");
const Category = require("../models/Category");
const User = require("../models/User");

exports.createPost = async (req, res) => {
  try {
    const { url } = req.body;
    const user = req.user.id;
 
    let platform;
    let metadata;

    if (url.includes("youtube.com") || url.includes("youtu.be")) {

      platform = "youtube";
      metadata = await getYoutubeData(url);

    } else if (url.includes("instagram.com")) {

      platform = "instagram";
      metadata = await getInstagramData(url);

    } else {
      return res.status(400).json({ message: "Unsupported platform" });
    }

    const textForAI =
      `${metadata.title} ${metadata.description} ${metadata.hashtags.join(" ")}`.trim();

    const categoryName = await categorizeContent(textForAI);
    console.log("categoryName:", categoryName);
    // Find category document
    let categoryDoc = await Category.findOne({
      name: categoryName,
      user,
    });

    // If category does not exist → create it
    if (!categoryDoc) {
      categoryDoc = await Category.create({
        name: categoryName,
        user,
      });
    }
    const post = await Post.create({
      user,
      url,
      title: metadata.title,
      platform,
      description: metadata.description,
      hashtags: metadata.hashtags,
      thumbnail: metadata.thumbnail,
      category: categoryDoc._id,
    });

  await User.findByIdAndUpdate(
  user,
  {
    $addToSet: {
      savedPosts: post._id,
      categories: post.category
    }
  },
  { new: true }
);

    res.status(201).json({success:true,user,message:"post created successfully"});
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getUserPosts = async (req, res) => {
  try {
    const userId = req.user.id;

    const posts = await Post.find({ user: userId })
      .populate("category", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: posts.length,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.deleteUserPosts = async (req, res) => {
   const postId = req.params.id;

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // Optional: Only allow owner to delete
    if (post.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "You are not authorized to delete this post" });
    }

    await Post.findByIdAndDelete(postId);
    res.status(200).json({ message: "Post deleted successfully",success:true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}