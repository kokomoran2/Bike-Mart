const mongoose = require("mongoose");

const bikeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    model: { type: String, required: true },
    date: { type: Date, required: true },
    engine: { type: String, required: true },
    power: { type: String, required: true },
    mileage: { type: String, required: true },
    price: { type: String, required: true },
    bikeImage: { type: String, required: true },
    Stock: { type: String, required: true }
}, { timestamps: true }); 

module.exports = mongoose.model("Bike", bikeSchema, "bikes"); 