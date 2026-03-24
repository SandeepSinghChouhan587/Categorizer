const express = require("express");

const {
  LoginVerifyOtp,
  verifyOtp,
  resendOtp
} = require("../controllers/authController");


const router = express.Router();

router.post("/login/verify-otp", LoginVerifyOtp);

router.post("/verify-otp", verifyOtp);

router.post("/resend-otp", resendOtp);


module.exports = router;