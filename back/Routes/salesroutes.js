const express = require("express");
const router = express.Router();
const salesController = require("../controllers/salescontroller");

// Middleware to check if ID is valid (Optional, but good practice)
const validateId = (req, res, next) => {
    if (!req.params.id || req.params.id.length !== 24) {
        return res.status(400).json({ message: "Invalid Sale ID format" });
    }
    next();
};
const validateCustomerId = (req, res, next) => {
    if (!req.params.customerId || req.params.customerId.length !== 24) {
        return res.status(400).json({ message: "Invalid Customer ID format" });
    }
    next();
};

// Routes
router.post("/add", salesController.addSale);
router.get("/all", salesController.getSales);
router.get("/customer/:customerEmail", salesController.getSalesByCustomer);
router.get("/:id", validateId, salesController.getSaleById); // ✅ ID Validation
router.put("/update-status", salesController.updateOrderStatus); // ✅ More descriptive
router.delete("/:id", validateId, salesController.deleteSale); // ✅ ID Validation
router.get("/filter", salesController.getSalesByDate);
router.get("/top-bikes", salesController.getTopSellingBikes);

module.exports = router;
