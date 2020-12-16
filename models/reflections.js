const mongoose = require("mongoose");

const ReflectionSchema = new mongoose.Schema({
  isPublic: {
    type: Boolean,
    default: true,
  },
  content: {
    required: true,
    type: String,
  },
  isPublished: {
    type: Boolean,
    default: true,
  },
  activity: { type: mongoose.Schema.Types.ObjectId, ref: "activity" },

  user: { type: mongoose.Schema.Types.ObjectId, ref: "activity" },
});

module.exports = mongoose.model("reflection", ReflectionSchema);
