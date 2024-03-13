const express = require("express");
const mongoose = require("mongoose");
const app = express();
const ProductSchema = require("../Models/productmodel");

// Middleware to parse JSON
app.use(express.json());

const ProductModel = mongoose.model("Product", ProductSchema);

const Deleteproduct = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const deletedProduct = await ProductModel.findOneAndDelete({ productId });

    if (deletedProduct) {
      console.log("Product deleted successfully");
      res.status(200).json({ message: "Deleted successfully", deletedProduct });
    } else {
      console.log("Product not found or not deleted");
      res.status(404).json({ message: "Product not found or not deleted" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = Deleteproduct;
