const express = require("express");
const mongoose = require("mongoose");
const app = express();
const OrderModel = require("../Models/Ordermodel"); // Correct the model variable name

// Middleware to parse JSON
app.use(express.json());

const AddOrder = async (req, res) => {
  try {
    const {
      OrderId,
      userName,
      quantity,
      TotalPrice,
      Address,
      MobNumber,
      paymentId, // Corrected variable name to match the schema
    } = req.body;

    if (
      !OrderId ||
      !userName ||
      !quantity ||
      !TotalPrice ||
      !Address ||
      !MobNumber ||
      !paymentId
    ) {
      return res.status(403).json({ message: "custom error" });
    }

    // Storing the data
    const orderSave = new OrderModel({
      OrderId,
      userName,
      quantity,
      TotalPrice,
      Address,
      MobNumber,
      paymentId,
    });

    // Save the order to the database
    await orderSave.save();
    res.status(200).json({ message: "Order added successfully" });
  } catch (error) {
    console.error(error);
    res.status(403).json({ message: "custom error" });
  }
};

module.exports = AddOrder;
