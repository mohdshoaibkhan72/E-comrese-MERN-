const express = require("express");
const User = require("./UserModel");
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
        return res.status(401).send({ erro: "user not found" });
      }
      //matching password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(500).send({ eroo: "password is not match " });
      }

      // Password is correct, create JWT token
      const accessToken = jwt.sign(
        { name: user.username, userId: user._id },
        process.env.ACCESS_TOKEN_SECRET
      );
      // Respond with the token and user details
      res.status(200).json({ accessToken, user: { name: user.username } });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Login failed", details: error.message });
    }
  });

module.exports = login;
