const axios = require("axios");
const mongoose = require("mongoose");
const Sales = require("../models/sales");

// ✅ 1. Add a Sale
exports.addSale = async (req, res) => {
    try {
        const { bikeId, customerId, district, address } = req.body;

        if (!bikeId || !customerId || !district || !address) {
            return res.status(400).json({ message: "Missing required fields!" });
        }

        if (!mongoose.Types.ObjectId.isValid(bikeId) || !mongoose.Types.ObjectId.isValid(customerId)) {
            return res.status(400).json({ message: "Invalid Bike or Customer ID format" });
        }

        // Fetch bike details
        let bike;
        try {
            const bikeResponse = await axios.get(`http://localhost:5000/api/bikes/get/${bikeId}`);
            bike = bikeResponse.data;
        } catch (error) {
            return res.status(500).json({ message: "Failed to fetch bike details" });
        }

        if (!bike) return res.status(404).json({ message: "Bike not found" });

        // Fetch customer details
        let customer;
        try {
            const customerResponse = await axios.get(`http://localhost:5000/api/customers/get/${customerId}`);
            customer = customerResponse.data;
        } catch (error) {
            return res.status(500).json({ message: "Failed to fetch customer details" });
        }

        if (!customer) return res.status(404).json({ message: "Customer not found" });

        // ✅ Convert bike price from string to number
        const numericPrice = parseInt(bike.price.replace(/[^\d]/g, ""), 10);

        if (isNaN(numericPrice)) {
            return res.status(400).json({ message: "Invalid price format from bike data" });
        }

        // ✅ Store full objects, not just IDs
        const newSale = new Sales({
            bike: {
                name: bike.name,
                price: numericPrice  // ✅ Now a proper number
            },
            customer: {
                name: customer.name,
                email: customer.email,
                address: address  
            },
            district,
            orderStatus: {
                initiated: true,
                packageDispatched: false,
                outForDelivery: false
            }
        });

        await newSale.save();
        res.status(201).json({ message: "Sale recorded successfully", sale: newSale });

    } catch (error) {
        console.error("Error saving sale:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};


// ✅ 2. Get All Sales
exports.getSales = async (req, res) => {
    try {
        const sales = await Sales.find();
        res.status(200).json(sales);
    } catch (error) {
        console.error("Error fetching sales:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// ✅ 3. Get Sale by ID
exports.getSaleById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid Sale ID format" });
        }

        const sale = await Sales.findById(id);
        if (!sale) return res.status(404).json({ message: "Sale not found" });

        res.status(200).json(sale);
    } catch (error) {
        console.error("Error fetching sale by ID:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.getSalesByCustomer = async (req, res) => {
    try {
        const customerEmail = decodeURIComponent(req.params.customerEmail); // ✅ Decode email
        console.log("Decoded Customer Email:", customerEmail);

        if (!customerEmail || !customerEmail.includes("@")) {
            return res.status(400).json({ message: "Invalid Customer Email format" });
        }

        // ✅ Query MongoDB using email instead of ObjectId
        const sales = await Sales.find({ "customer.email": customerEmail });

        if (!sales.length) {
            return res.status(404).json({ message: "No sales found for this customer" });
        }

        res.status(200).json(sales);
    } catch (error) {
        console.error("Error fetching sales by customer:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const { saleId, status } = req.body;

        if (!mongoose.Types.ObjectId.isValid(saleId)) {
            return res.status(400).json({ message: "Invalid Sale ID format" });
        }

        const sale = await Sales.findById(saleId);
        if (!sale) return res.status(404).json({ message: "Sale not found" });

        if (status in sale.orderStatus) {
            sale.orderStatus[status] = true;
        } else {
            return res.status(400).json({ message: "Invalid order status" });
        }

        await sale.save();
        res.status(200).json({ message: "Order status updated successfully", sale });
    } catch (error) {
        console.error("Error updating order status:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// ✅ 6. Delete Sale
exports.deleteSale = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid Sale ID format" });
        }

        const sale = await Sales.findByIdAndDelete(req.params.id);
        if (!sale) return res.status(404).json({ message: "Sale not found" });

        res.status(200).json({ message: "Sale deleted successfully" });
    } catch (error) {
        console.error("Error deleting sale:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// ✅ 7. Get Sales by Date Range
exports.getSalesByDate = async (req, res) => {
    try {
        const { start, end } = req.query;

        if (!start || !end) {
            return res.status(400).json({ message: "Start and end date are required." });
        }

        const sales = await Sales.find({
            date: { $gte: new Date(start), $lte: new Date(end) }
        });

        if (!sales.length) return res.status(404).json({ message: "No sales found in this date range" });

        res.status(200).json(sales);
    } catch (error) {
        console.error("Error fetching sales by date:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// ✅ 8. Get Top-Selling Bikes
exports.getTopSellingBikes = async (req, res) => {
    try {
        const topBikes = await Sales.aggregate([
            { $match: { "bike.name": { $exists: true, $ne: null } } }, // Ensure valid bike names
            { 
                $group: { 
                    _id: "$bike.name",  
                    count: { $sum: 1 }  
                } 
            },
            { $sort: { count: -1 } },
            { $limit: 5 }
        ]);

        if (!topBikes.length) {
            return res.status(404).json({ message: "No top-selling bikes found." });
        }

        res.status(200).json(topBikes.map(bike => ({
            name: bike._id,
            count: bike.count
        })));
    } catch (error) {
        console.error("Error fetching top-selling bikes:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};