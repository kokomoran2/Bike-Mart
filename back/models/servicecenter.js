const mongoose = require("mongoose");

const serviceCenterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    contact: { type: String, required: true },
    status: { type: String, required: true, enum: ["Open", "Temporarily Closed"] },
    closingTime: { type: String, required: true },
    services: { type: [String], required: true },
    location: {
        type: {
            type: String,
            enum: ["Point"],
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
        },
    },
});
serviceCenterSchema.index({ location: "2dsphere" });
const ServiceCenter = mongoose.model("ServiceCenter", serviceCenterSchema);
module.exports = ServiceCenter;
