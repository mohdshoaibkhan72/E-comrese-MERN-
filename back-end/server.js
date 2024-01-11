const express = require("express");
const connectDB = require("./db/connection");

const app = express();
const cors = require("cors");
require("dotenv").config();

const registerUser = require("./db/Registration");
const login = require("./db/login");

//midleware for parsing
app.use(express.json());
connectDB();

//anable corsee
app.use(cors());

//importing from registration
app.post("/register", registerUser);

//importing login page
app.post("/login", login);

app.listen(8000, () => {
  console.log("server is runing in port no 8000");
});
