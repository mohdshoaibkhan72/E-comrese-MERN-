const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  productId: {
    type: Number,
    required: true,
    trim: true,
    unique: true,
  },
  productName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 20,
  },
  productPrice: {
    type: Number,
    required: true,
    trim: true,
    min: 0,
  },
  productDescription: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },
  productPhoto: {
    data: Buffer, 
    contentType: String
  },
});

module.exports = ProductSchema;
