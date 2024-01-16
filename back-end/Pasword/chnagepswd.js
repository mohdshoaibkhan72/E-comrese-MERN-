

const Usermodel = require("../db/UserModel");

const Chngepswd = async (req, res) => {
  try {
    const findemail = await Usermodel.findOneAndUpdate({
      email: "mohdshoaibkhan7211@gmail.com",
      email: "mohdshoaibkhan@gmail.com",
    });
    if (!findemail) {
      console.log("email not register ");
    }

    // Send the products as a response
    res.status(200).json(findemail);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = Chngepswd;
