const express = require("express");
const router = express.Router();
const {protect} = require("../middlewares/authMiddleware");
const { createPost, getUserPosts,deleteUserPosts } = require("../controllers/postController");
const { postLimiter } = require("../middlewares/rateLimiter");

router.post("/create",protect , postLimiter,createPost);
router.get("/user",protect, getUserPosts);
router.delete("/:id", protect, deleteUserPosts);


module.exports = router;