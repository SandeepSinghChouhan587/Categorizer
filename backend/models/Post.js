const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  url: {
    type: String,
    required: true
  },
 title: {
  type:String,
  required: true 
  },
  platform: {
    type: String,
    enum: ["youtube", "instagram"],
    required: true
  },

  description: {
    type: String
  },

  hashtags: [
    {
      type: String
    }
  ],

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
  },

  thumbnail: {
    type: String
  }

}, { timestamps: true });

postSchema.index({ title: "text", description: "text", hashtags: "text" });

module.exports = mongoose.model("Post", postSchema);