const express = require("express");
const connectDB = require("./db/connection");
const User = require("./db/user");
const app = express();
const cors = require("cors");
//midleware for parsing
app.use(express.json());

//enable corde
app.use(cors());
//registration
app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
     if (user.ok) {
      alert("Register succesfull");
    }

    await user.save();
   
    if (user != ok) {
      alert("somthing wents wrong please enter again ");
    }
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
    if (user.ok) {
      alert("login succesfull");
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
