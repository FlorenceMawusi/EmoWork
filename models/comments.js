const mongoose = require("mongoose");

const CommentsSchema = new mongoose.Schema({
  
  text: {
    required: true,
    type: String,
  },
  
  reflection: { type: mongoose.Schema.Types.ObjectId, ref: "reflection" },

  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

module.exports = mongoose.model("comments", CommentsSchema);
