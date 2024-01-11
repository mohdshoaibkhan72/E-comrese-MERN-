const express = require("express");
const User =require ("./user");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(cors());


const jwt = require("jsonwebtoken");
const login=("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid username or password" });
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