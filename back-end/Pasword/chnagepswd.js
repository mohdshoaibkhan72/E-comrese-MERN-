const usermodel = require("../db/UserModel");

const Chngepswd = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    // Using findOneAndUpdate to find a user by email and update their password
    const response = await usermodel.findOneAndUpdate(
      { email: email },
      { $set: { password: newPassword } },
      { new: true }
    );
    if (!response) {
      // If the user with the provided email is not found
      console.log("Please provide the correct email and password.");
      return res.status(404).json({ message: "User not found" });
    }

    // If the password is successfully updated
    console.log("Password updated successfully");
    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = Chngepswd;
