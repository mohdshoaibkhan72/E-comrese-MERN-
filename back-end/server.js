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
// app.get("/login", (req, res) => {
//   res.send("<h1>hlw sir i am login sir </h1>");
//   console.log("i am port login");
// });

connectDB();
app.listen(8000, () => {
  console.log("server is runing in port no 8000");
});
