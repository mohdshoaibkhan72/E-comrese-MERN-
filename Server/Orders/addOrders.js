const express = require("express");
const mongoose = require("mongoose");
const app = express();
const OrderModel = require("../Models/Ordermodel"); // Correct the model variable name

// Middleware to parse JSON
app.use(express.json());

const AddOrder = async (req, res) => {
  try {
    const { userName, TotalPrice, Address, MobNumber, paymentId, items } =
      req.body;

    if (
      !userName ||
      !TotalPrice ||
      !Address ||
      !MobNumber ||
      !paymentId ||
      !items ||
      items.length === 0
    ) {
      return res.status(403).json({ message: "custom error" });
    }

    // Storing the data
    const orderSave = new OrderModel({
      userName,
      TotalPrice,
      Address,
      MobNumber,
      paymentId,
      items,
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
