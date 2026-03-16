const express = require("express");

const {
  register,
  login,
  verifyOtp,
  resendOtp
} = require("../controllers/authController");
const { authLimiter } = require("../middlewares/rateLimiter");

const router = express.Router();

//ApI paths api/auth/..paths
router.post("/register",authLimiter, register);

router.post("/login",authLimiter, login);

router.post("/verify-otp",authLimiter, verifyOtp);

router.post("/resend-otp",authLimiter, resendOtp);

module.exports = router;