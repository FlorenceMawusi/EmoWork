const mongoose = require("mongoose");

const ActivitySchema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  benefits: {
    required: true,
    type: String,
  },
  reflection_prompt: {
    required: true,
    type: String,
  },
  picture: {
    required: false,
    type: String,
  },
  disabled: {
    type: Boolean,
    default: true,
  },
  isComplete: {
    type: String,
    default: "blank",
  },
});

ActivitySchema.set("toJSON", {
  transform: (document, returnedActivity) => {
    delete returnedActivity.__v;
  },
});

module.exports = mongoose.model("activity", ActivitySchema);
