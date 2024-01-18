const express = require("express");
const mongoose = require("mongoose");
const app = express();
const ProductSchema = require("./productmodel");

// Middleware to parse JSON
app.use(express.json());

const ProductModel = mongoose.model("Product", ProductSchema);

const Deleteproduct = async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({ message: "product  id is requires" });
    }
    const products = await ProductModel.findOneAndDelete({
      productId: `${productId}`,
    });

    if (products.ok) {
      console.log("deletes succesfully ");
      res.status(200).json({ message: "Dlelted successfuly " });
    } else {
      console.log("Product  not deleted  or founds");
    }

    // Send the products as a response
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = Deleteproduct;
