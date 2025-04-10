const express = require('express');
const router = express.Router();
const Sold = require('../models/sold');
const Sale = require('../models/sales'); // Make sure this is the correct path

// Mark Sale as Sold
router.post('/:saleId', async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.saleId);
    if (!sale) {
      return res.status(404).json({ message: 'Sale not found' });
    }

    // Create Sold entry
    const soldItem = new Sold({
      customerName: sale.customer.name,
      bikeName: sale.bike.name,
      price: sale.bike.price,
      district: sale.district,
      address: sale.customer.address,
    });

    await soldItem.save();
    await Sale.findByIdAndDelete(req.params.saleId); // Delete from Sales
    res.status(201).json({ message: 'Marked as Sold and moved to Sold Table', soldItem });
  } catch (error) {
    res.status(500).json({ error: error.message || "An unexpected error occurred" });
  }
});

// Get All Sold Items
router.get("/", async (req, res) => {
  try {
    const soldItems = await Sold.find();
    res.status(200).json(soldItems);
  } catch (error) {
    res.status(500).json({ error: error.message || "Failed to retrieve sold items" });
  }
});

// Delete Sold Item by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedItem = await Sold.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: "Sold item not found" });
    }
    res.status(200).json({ message: "Sold item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message || "Failed to delete sold item" });
  }
});

module.exports = router;
