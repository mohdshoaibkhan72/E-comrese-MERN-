const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
  // Add any other details specific to the item
});

const OrderSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  TotalPrice: {
    type: Number,
    required: true,
  },
  Address: {
    type: String,
    required: true,
  },
  MobNumber: {
    type: Number,
    unique: true,
    maxlength: 10,
  },
  paymentId: {
    type: Number,
    unique: true,
    required: true,
  },
  items: [ItemSchema], // Array of items within the order
});

module.exports = mongoose.model("Order", OrderSchema);
