const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    contact: { type: String, required: true },
    feedback: { type: String, required: true }, // Fixed typo and lowercase field name
});

const Feedback = mongoose.model("Feedback", FeedbackSchema);

module.exports = Feedback;
