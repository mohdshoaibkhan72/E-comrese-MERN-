// registerController.js
const express = require("express");
const app = express();
const cors = require("cors");
const User = require("./user");
app.use(cors());

const registerUser = async (req, res) => {
  try {
    const { fullName, username, password, email, mobileNumber } = req.body;
    console.log(req.body);

  
    const user = new User({
      fullName,
      username,
      password,
      email,
      mobileNumber,
    });

    await user.save();
    res.status(201).json({ message: "Registration is successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = registerUser;
