const Bike = require("../models/addbike");

// Add a new bike
const createBike = async (req, res) => {
    try {
        const { name, model, date, engine, power, mileage,price,Stock } = req.body;

        // Check if the bike already exists
        const existingBike = await Bike.findOne({ name, model });
        if (existingBike) {
            return res.status(409).json({ error: "Bike already exists." });
        }

        // Create new bike entry
        const newBike = new Bike({
            name,
            model,
            date,
            engine,
            power,
            mileage,
            price,
            bikeImage: req.file ? req.file.filename : "",
            Stock
        });

        await newBike.save();
        res.status(201).json({ message: "Bike added successfully", newBike });
    } catch (error) {
        console.error("Error adding bike:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get all bikes
const getAllBikes = async (req, res) => {
    try {
        const bikes = await Bike.find();

        // Append full image URL
        const bikesWithImageURL = bikes.map(bike => ({
            ...bike._doc,
            bikeImage: bike.bikeImage 
                ? `http://localhost:5000/uploads/${bike.bikeImage}` 
                : null,
        }));

        res.json(bikesWithImageURL);
    } catch (error) {
        console.error("Error fetching bikes:", error);
        res.status(500).json({ error: "Error fetching bikes" });
    }
};

// Update an existing bike
const updateBike = async (req, res) => {
    try {
        const { name, model, date, engine, power, mileage,price,Stock } = req.body;
        const { id } = req.params;

        // Find bike by ID
        const bike = await Bike.findById(id);
        if (!bike) {
            return res.status(404).json({ error: "Bike not found" });
        }

        // Update bike details
        bike.name = name || bike.name;
        bike.model = model || bike.model;
        bike.date = date || bike.date;
        bike.engine = engine || bike.engine;
        bike.power = power || bike.power;
        bike.mileage = mileage || bike.mileage;
        bike.price = price || bike.price;
        bike.Stock = Stock || bike.Stock;

        // Update image if new one is uploaded
        if (req.file) {
            bike.bikeImage = req.file.filename;
        }

        await bike.save();
        res.json({ message: "Bike updated successfully", bike });
    } catch (error) {
        console.error("Error updating bike:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Delete a bike
const deleteBike = async (req, res) => {
    try {
        const { id } = req.params;

        // Find and delete bike
        const deletedBike = await Bike.findByIdAndDelete(id);
        if (!deletedBike) {
            return res.status(404).json({ error: "Bike not found" });
        }

        res.json({ message: "Bike deleted successfully" });
    } catch (error) {
        console.error("Error deleting bike:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
const getBikeById = async (req, res) => {
    try {
        const { id } = req.params;
        const bike = await Bike.findById(id);
        if (!bike) return res.status(404).json({ message: "Bike not found" });

        res.status(200).json(bike);
    } catch (error) {
        console.error("Error fetching bike by ID:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


module.exports = { createBike, getAllBikes, updateBike, deleteBike, getBikeById };