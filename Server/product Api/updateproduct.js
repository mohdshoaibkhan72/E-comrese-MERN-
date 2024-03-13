const express = require("express");
const mongoose = require("mongoose");
const app = express();
const ProductSchema = require("../Models/productmodel");

app.use(express.json());

const ProductModel = mongoose.model("Product", ProductSchema);

// Function to update a product
const UpdateProduct = async (req, res) => {
  try {
    const { productId, productName, productPrice, productDescription } =
      req.body;

    if (!productId || !productName || !productPrice || !productDescription) {
      return res.status(403).json({ message: "Please provide all fields" });
    }

    // Check if the product exists
    const existingProduct = await ProductModel.findOne({ productId });
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    // Update the product fields
    existingProduct.productName = productName;
    existingProduct.productPrice = productPrice;
    existingProduct.productDescription = productDescription;

    // Save the updated product to the database
    await existingProduct.save();
    res
      .status(200)
      .json({ success: true, message: "Product updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
module.exports = UpdateProduct;
