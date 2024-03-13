const CartItem = require("../models/Cardmodel");

const Addcard = async (req, res) => {
  try {
    const { productName, productPrice, quantity, user, productId } = req.body;

    // Check if a cart item already exists for the user and product
    const existingCartItem = await CartItem.findOne({ productName, user });

    if (existingCartItem) {
      console.log("already exist");
      return res
        .status(400)
        .json({ success: false, message: "Item already added to the cart" });
    }

    // Create a new cart item
    const newCartItem = new CartItem({
      user,
      productId,
      productName,
      productPrice,
      quantity: quantity || 1, // Default to 1 if quantity is not provided
    });

    // Save the new cart item to the database
    await newCartItem.save();

    // Respond with a success message
    res
      .status(201)
      .json({ success: true, message: "Cart item stored successfully" });
  } catch (error) {
    // Handle errors, log the error, and send a 500 Internal Server Error response
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = Addcard;
