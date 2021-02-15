const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);

const ReflectionSchema = new mongoose.Schema({
  isPublic: {
    type: Boolean,
    
  },
  content: {
    required: true,
    type: String,
  },
  isPublished: {
    type: Boolean,
    
  },
  activity: { type: mongoose.Schema.Types.ObjectId, ref: "activity" },

  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },

  // likes: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "likes',
  //   },
  // ],

  // comments: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'comments',
  //   },
  // ],
});

module.exports = mongoose.model("reflection", ReflectionSchema);
