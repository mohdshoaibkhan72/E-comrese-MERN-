const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose

      .connect(
        "mongodb+srv://mohdshoaib72:C3eNKTNQXB7bPoJN@cluster0.gm9smjp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
      )
      .then(console.log("mongose is connected suucesfulluly "));
  } catch (error) {
    console.log(error);
  }
};
module.exports = connectDB;
