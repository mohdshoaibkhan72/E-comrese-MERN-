const express = require("express");
const connectDB = require("./db/connection");
const User = require("./db/user");
const app = express();

//midleware for parsing
app.use(express.json());

//registration
app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(req.body);
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: "Registration is successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//login ....
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Invilid username or password" });
    }
    if (user.password !== password) {
      return res.status(401).json({ error: "invilid username password" });
    }
    res.status(200).json({ massage: "login succesfull" });
  } catch (error) {
    res.status(500).json({ error: "login failde" });
  }
});

connectDB();
app.listen(8000, () => {
  console.log("server is runing in port no 8000");
});
