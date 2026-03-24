const express = require("express");
const router = express.Router();
const { createPost, getUserPosts,deleteUserPosts } = require("../controllers/postController");

router.post("/create",createPost);
router.get("/user", getUserPosts);
router.delete("/:id", deleteUserPosts);


module.exports = router;