const express = require("express");
const mongoose = require("mongoose");
const app = express();
const ProductSchema = require("./productmodel");

// Middleware to parse JSON
app.use(express.json());

const ProductModel = mongoose.model("Product", ProductSchema);

const Deleteproduct = async (req, res) => {
  try {
    const products = await ProductModel.findOneAndDelete({ productId: "122" });

    if (products) {
      console.log("deletes succesfully ");
    } else {
      console.log("Product  not deleted s or founds");
    }

    // Send the products as a response
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = Deleteproduct;
