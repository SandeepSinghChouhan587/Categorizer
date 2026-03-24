const RateLimit = require("../models/RateLimit");

// Generic limiter function (reusable)
const rateLimiter = (limit, windowMs, routeName) => {
  return async (req, res, next) => {
    try {
      const userId = req.user?.id || req.ip; // logged-in user OR IP
      const now = new Date();

      let record = await RateLimit.findOne({ userId, route: routeName });

     
      if (!record) {
        await RateLimit.create({
          userId,
          route: routeName,
          count: 1,
          lastRequestTime: now,
        });
        return next();
      }

      const timeDiff = now - record.lastRequestTime;

  
      if (timeDiff > windowMs) {
        record.count = 1;
        record.lastRequestTime = now;
        await record.save();
        return next();
      }

      // If limit exceeded
      if (record.count >= limit) {
        return res.status(429).json({
          success: false,
          message: "Too many requests. Try again later.",
        });
      }

      // Otherwise increment
      record.count += 1;
      await record.save();

      next();
    } catch (err) {
      console.error("RateLimiter Error:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  };
};


// 🔐 Auth routes (login/register)
exports.authLimiter = rateLimiter(10, 15 * 60 * 1000, "auth");


// 📝 Post routes 
exports.postLimiter = rateLimiter(25, 10 * 60 * 1000, "post");


// 🌐 General API
exports.apiLimiter = rateLimiter(100, 15 * 60 * 1000, "api");


// 🔢 OTP verification
exports.otpLimiter = rateLimiter(7, 15 * 60 * 1000, "otp");