const usermodel = require("../db/UserModel");

const Chngepswd = async (req, res) => {
  try {
    const user = req.user;
    const accessTokens = localStorage.getItem("accessToken");
    if (!accessTokens) {
      return res.status(401).json({ error: "unothersires" });
    }

    const { newPassword } = req.body;

    const response = await usermodel.findOneAndUpdate(
      { email: user.email },
      { $set: { password: newPassword } },
      { new: true }
    );
    if (!response) {
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
