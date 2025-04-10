const mongoose = require("mongoose");

const SalesSchema = new mongoose.Schema({
    bike: {
        name: { type: String, required: true },
        price: { type: Number, required: true }
    },
    customer: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        address: { type: String, required: true }
    },
    district: { type: String, required: true },  // ✅ Added District Field
    orderStatus: {
        initiated: { type: Boolean, default: true },
        packageDispatched: { type: Boolean, default: false },
        outForDelivery: { type: Boolean, default: false }
    },
    date: { type: Date, default: Date.now }
});

const Sales = mongoose.model("Sales", SalesSchema);

module.exports = Sales;
