const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  OrderId: {
    type: Number,
    required: true,
    unique: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  quantity: {
    type: Number, // Note: 'number' should be 'Number'
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
});

module.exports = mongoose.model("Order", OrderSchema);
