const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    Number,
    required: true,
  },
  
});

const Users = mongoose.model('User',UserSchema);
module.exports=Users;