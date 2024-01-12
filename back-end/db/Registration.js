// registerController.js
const express = require("express");
const app = express();
const cors = require("cors");
const User = require("./user");
const bcrypt = require("bcrypt");
app.use(cors());

const registerUser = async (req, res) => {
  try {
    const { fullName, username, password, email, mobileNumber } = req.body;

    //validation
    if (!fullName || !username || !password || !email || !mobileNumber) {
      return res.status(500).send({
        success: false,
        message: "pleas provide all filed",
      });
    }

    //chek user
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(500).send({
        success: false,
        message: "Email is alredy existing",
      });
    }
    //hasing pawsod

    const salt = bcrypt.genSaltSync(1);
    const hashedPassword = await bcrypt.hash(password, salt);

    //storing the new data
    const user = new User({
      fullName,
      username,
      password: hashedPassword,
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
