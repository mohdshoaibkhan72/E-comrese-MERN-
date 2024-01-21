// models/CartItem.js
const mongoose = require("mongoose");
const CartItemSchema = new mongoose.Schema({
  user: {
    type: String,
  },
  productId: {
    type: Number,
  },
  productName: {
    type: String,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  filename: {
    type: String,
  },
});

const CartItem = mongoose.model("CartItem", CartItemSchema);

module.exports = CartItem;
