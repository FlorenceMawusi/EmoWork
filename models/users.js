const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  gender:{
    type: String,
  },

  field:{
    type: String,
  },

  age:{
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  // reflections: [
  //   {
  //     type:mongoose.Schema.Types.ObjectId,
  //     ref: 'reflection'
  //   } 
  // ]
});

//export model user with UserSchema
module.exports = mongoose.model('user', UserSchema);
