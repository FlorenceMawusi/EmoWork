const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

const ReflectionSchema = new mongoose.Schema({
  isPublic: {
    required: true,
    type: Boolean,
  },
  content: {
    required: true,
    type: String,
  },
  isPublished: {
    type: Boolean,
    
  },

  datePosted: {
    type: Date,
    default: new Date(),
  },
  activity: { type: mongoose.Schema.Types.ObjectId, ref: "activity" },

  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },

  // likes: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "likes",
  //   },
  // ],

  // comments: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "comments",
  //   },
  // ],
});

ReflectionSchema.set('toJSON', {
  transform: (document, returnedReflection) => {
    delete returnedReflection.__v
  }
})

module.exports = mongoose.model("reflection", ReflectionSchema);
