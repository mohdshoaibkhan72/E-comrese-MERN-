const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    trim: true,
    required: true,
    maxlength: 50, // Adjust the maximum length as needed
  },
  username: {
    type: String,
    min: 6,
    max: 15,
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    min: 8,
    max: 16,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  mobileNumber: {
    type: String, Number,
    trim: true,
    required: true,
    unique: true,
  },
});

const Users = mongoose.model("User", UserSchema);

module.exports = Users;
