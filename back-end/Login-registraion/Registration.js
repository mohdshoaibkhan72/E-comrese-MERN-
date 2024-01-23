// registerController.js
const express = require("express");
const app = express();
const cors = require("cors");
const User = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
app.use(cors());

const registerUser = async (req, res) => {
  try {
    const { fullName, username, password, email, mobileNumber, accountType } =
      req.body;

    //validation
    if (
      !fullName ||
      !username ||
      !password ||
      !email ||
      !mobileNumber ||
      !accountType
    ) {
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
      accountType,
    });
    await user.save();
    //send the success msg

    // Registraation done, create JWT token
    const accessToken = jwt.sign(
      { name: user.username, userId: user._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    console.log(accessToken);
    res.status(201).json({
      success: true,
      message: "Registration is successful",
      accessToken,
      user: { name: user.username },
      accountType: { type: user.accountType },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = registerUser;
