const express = require("express");
const User = require("../Models/UserModel");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
app.use(cors());
const login =
  ("/login",
  async (req, res) => {
    try {
      const { email, password } = req.body;
      //validation for chek inputs and pasword
      if (!email || !password) {
        return res.status(500).send({
          success: false,
          message: "pleas provide email and pasword",
        });
      }
      //finding user
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).send({ message: "user not found" });
      }
      //matching password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(500).send({ message: "password is not match " });
      }

      // Password is correct, create JWT token
      const accessToken = jwt.sign(
        {
          name: user.username,
          userId: user._id,
          email: user.email,
          accountType: user.accountType,
        },
        process.env.ACCESS_TOKEN_SECRET
      );
      // Respond with the token and user details
      // Respond with the token, user details, and account type
      res.status(200).json({
        accessToken,
        user: {
          name: user.username,
          email: user.email,
          accountType: user.accountType,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Login failed", details: error.message });
    }
  });

module.exports = login;
