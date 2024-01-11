const mongoose =  require("mongoose");
const connectDB =async () => {
   try {
      await mongoose
      //  .connect("mongodb+srv://mohdshoaibkhan7211:mohdshoaibkhan7211@user.vtgqtnc.mongodb.net/mydatabase?retryWrites=true&w=majority")
        .connect("mongodb://127.0.0.1:27017/mydatabase")
        .then(console.log("mongose is connected suucesfulluly "));
    } catch (error) {
      console.log(error);
    }
  };
  module.exports=connectDB;
  
 