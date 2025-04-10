const axios = require("axios");
const mongoose = require("mongoose");
const Sold = require("../models/sold");

// Create a new Sold
const createSold = async (req, res) => {
  try {
    const { customerName, bikeName, price, district, address } = req.body;

    if (!customerName || !bikeName || !price || !district || !address) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newSold = new Sold({ customerName, bikeName, price, district, address });
    await newSold.save();
    res.status(201).json({ message: 'Sold created successfully', sold: newSold });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Sold
const getAllSold = async (req, res) => {
  try {
    const soldItems = await Sold.find();
    res.status(200).json(soldItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Sold by ID
const getSoldById = async (req, res) => {
  try {
    const soldItem = await Sold.findById(req.params.id);
    if (!soldItem) {
      return res.status(404).json({ message: 'Sold item not found' });
    }
    res.status(200).json(soldItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Sold by ID
const updateSold = async (req, res) => {
  try {
    const updatedSold = await Sold.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSold) {
      return res.status(404).json({ message: 'Sold item not found' });
    }
    res.status(200).json({ message: 'Sold updated successfully', sold: updatedSold });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Sold by ID
const deleteSold = async (req, res) => {
  try {
    const deletedSold = await Sold.findByIdAndDelete(req.params.id);
    if (!deletedSold) {
      return res.status(404).json({ message: 'Sold item not found' });
    }
    res.status(200).json({ message: 'Sold item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createSold,
  getAllSold,
  getSoldById,
  updateSold,
  deleteSold,
};
