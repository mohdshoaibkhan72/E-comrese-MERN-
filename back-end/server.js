const express = require("express");
const connectDB = require("./db/connection");
const User = require("./db/user");
const app = express();
const cors = require("cors");
require("dotenv").config();

//midleware for parsing
app.use(express.json());
connectDB();

//enable corde
app.use(cors());




//registration
app.post("/register", async (req, res) => {
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
    const reg = await User.findOne({ email });
    if (reg) {
      alert("email alredy register");
    } else {
      await user.save();
      res.status(201).json({ message: "Registration is successful" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});











//login ....
const jwt = require("jsonwebtoken");

app.post("/login", async (req, res) => {
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

app.listen(8000, () => {
  console.log("server is runing in port no 8000");
});
