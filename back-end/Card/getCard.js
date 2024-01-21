// routes/cartRoutes.js
const CartItem = require("../models/Cardmodel");

// Route to get all items in the cart
const GetCartItems = async (req, res) => {
  try {
    // Retrieve all items from the cart
    const cartItems = await CartItem.find();

    // Respond with the list of cart items
    res.status(200).json({ success: true, data: cartItems });
  } catch (error) {
    // Handle errors, log the error, and send a 500 Internal Server Error response
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = GetCartItems;
