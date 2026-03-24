const mongoose = require("mongoose");

const rateLimitSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // or IP
  route: { type: String, required: true },  // login, verifyOtp
  count: { type: Number, default: 0 },
  lastRequestTime: { type: Date, default: Date.now }
});


module.exports = mongoose.model("RateLimit", rateLimitSchema);