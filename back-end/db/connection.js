const mongoose = require("mongoose");
const connectDB = () => {
    try {
      mongoose
        .connect("mongodb://127.0.0.1:27017/mydatabase")
        .then(console.log("mongose is connected suucesfulluly "));
    } catch (error) {
      console.log(error);
    }
  };
  module.exports=connectDB;