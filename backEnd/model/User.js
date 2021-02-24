const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 255,
  },
  email: {
    type: String,
    minLength: 4,
    maxLength: 255,
  },
  password: {
    type: String,
    minLength: 6,
    maxLength: 1024,
  },
});

module.exports = mongoose.model("User", userSchema);
