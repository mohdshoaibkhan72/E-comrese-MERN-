const express = require("express");
const mongoose = require("mongoose");
const app = express();
const ProductSchema = require("../Models/productmodel");

// Middleware to parse JSON
app.use(express.json());

// Creating a Mongoose model using the ProductSchema
const ProductModel = mongoose.model("Product", ProductSchema);

const Addproduct = async (req, res) => {
  try {
    const { productId, productName, productPrice, productDescription } =
      req.body;
    const file = req.file;
    console.log("geting output", req.bod, file);

    if (
      !productId ||
      !productName ||
      !productPrice ||
      !productDescription ||
      !file
    ) {
      // return res.status(500).json({error: "pleas provide alla filds"});
      return res.status(403).json({ message: "custom error" });
    }

    // Storing the data
    const productsave = new ProductModel({
      productId,
      productName,
      productPrice,
      productDescription,
      productPhoto: {
        filename: file.filename,
      },
    });

    // Save the product to the database
    await productsave.save();
    res.status(200).json({ message: "Product added successfully" });
  } catch (error) {
    console.error(error);

    res.status(403).json({ message: "custom error" });
  }
};

module.exports = Addproduct;
