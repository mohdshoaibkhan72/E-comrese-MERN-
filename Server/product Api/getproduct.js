const express = require("express");
const mongoose = require("mongoose");
const app = express();
const ProductSchema = require("../Models/productmodel");

// Middleware to parse JSON
app.use(express.json());

// Creating a Mongoose model using the ProductSchema
const ProductModel = mongoose.model("Product", ProductSchema);

const Getproduct = async (req, res) => {
  try {
    const products = await ProductModel.find();

    // Send the products as a response
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = Getproduct;
