// routes/cartRoutes.js
const CartItem = require("../models/Cardmodel");

// Route to delete an item from the cart
const DelCartItems = async (req, res) => {
  try {
    const { _id } = req.body;

    if (!_id) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    // Delete the item from the cart
    const deletedItem = await CartItem.findOneAndDelete({ _id });

    if (!deletedItem) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    }

    // Respond with the deleted item
    res.status(200).json({ success: true, data: deletedItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = DelCartItems;
