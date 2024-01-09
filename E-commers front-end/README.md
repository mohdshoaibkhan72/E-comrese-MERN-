//connection of mongosh Db in server js file 

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const connect = () => {
  try {
    mongoose.connect("mongodb://localhost:27017");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
connect();
app.listen(8888, () => {
  console.log("server is listning at port no: 8000");
});
