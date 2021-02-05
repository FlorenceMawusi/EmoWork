const mongoose = require("mongoose");

const LikesSchema = new mongoose.Schema({
  
  reflection: { type: mongoose.Schema.Types.ObjectId, ref: "reflection" },

  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

module.exports = mongoose.model("likes", LikesSchema);
