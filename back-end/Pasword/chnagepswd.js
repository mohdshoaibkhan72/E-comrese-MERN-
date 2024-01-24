const bcrypt = require("bcrypt");
const usermodel = require("../Models/UserModel");

const Chngepswd = async (req, res) => {
  try {
    const user = req.user;

    const { newPassword } = req.body;

    // Hash the new password before updating
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const response = await usermodel.findOneAndUpdate(
      { email: user.email },
      { $set: { password: hashedPassword } }, // Update with hashed password
      { new: true }
    );

    if (!response) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Password updated successfully");
    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = Chngepswd;
