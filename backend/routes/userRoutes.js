const express = require("express");
const router = express.Router();
const {getProfileData}  = require("../controllers/userController");

router.get("/profile", getProfileData);

module.exports = router;