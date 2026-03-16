const express = require("express");
const router = express.Router();
const {protect} = require("../middlewares/authMiddleware");
const {getProfileData}  = require("../controllers/userController");

router.get("/profile", protect, getProfileData);

module.exports = router;