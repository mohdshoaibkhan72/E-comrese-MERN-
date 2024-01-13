

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const ProductSchema = require('./productmodel');

// Middleware to parse JSON
app.use(express.json());

// Creating a Mongoose model using the ProductSchema
const ProductModel = mongoose.model('Product', ProductSchema);

const Addproduct = async (req, res) => {
  try {
    const { productId, productName, productPrice, productDescription,productPhoto } = req.body;

 if(!productId || !productName || !productPrice || !productDescription || !productPhoto)
 {
  return res.status(500).json({error: "pleas provide alla filds"});
 }

    // Storing the data
    const productsave = new ProductModel({
      productId,
      productName,
      productPrice,
      productDescription,
      productPhoto,
    });

    // Save the product to the database
    await productsave.save();
    res.status(200).json({ message: "Product added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



module.exports = Addproduct;
