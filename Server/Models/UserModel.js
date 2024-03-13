const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    trim: true,
    required: true,
    maxlength: 50,
  },
  username: {
    type: String,
    min: 6,
    max: 20,
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    min: 8,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  emailVerified: {
    type: Boolean,
    default: true,
  },
  mobileNumber: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    maxlength: 12,
  },
  accountType: {
    type: String,
    enum: ["user", "seller"],
    default: "user",
  },
});

const Users = mongoose.model("User", UserSchema);
module.exports = Users;
