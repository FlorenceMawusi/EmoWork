const mongoose = require("mongoose");

const ResultsSchema = new mongoose.Schema({
  total: {
    type: Number,
    required: true
  },
  date_taken: {
    type: Date,
    default: Date.now(),
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

module.exports = mongoose.model("results", ResultsSchema);



