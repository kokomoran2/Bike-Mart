const Feedback = require('../models/feedback');

// Create Feedback
exports.createFeedback = async (req, res) => {
    try {
        const { name, location, contact, feedback } = req.body; // Updated field names
        const newFeedback = new Feedback({ name, location, contact, feedback }); // Ensure model fields match
        await newFeedback.save();
        res.status(201).json({ success: true, message: 'Feedback submitted successfully', feedback: newFeedback });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

// Get All Feedbacks
exports.getAllFeedback = async (req, res) => { // Renamed to match router
    try {
        const feedbacks = await Feedback.find();
        res.status(200).json({ success: true, feedbacks });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

// Get Single Feedback by ID
exports.getFeedbackById = async (req, res) => {
    try {
        const feedback = await Feedback.findById(req.params.id);
        if (!feedback) {
            return res.status(404).json({ success: false, message: 'Feedback not found' });
        }
        res.status(200).json({ success: true, feedback });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

// Delete Feedback
exports.deleteFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.findByIdAndDelete(req.params.id);
        if (!feedback) {
            return res.status(404).json({ success: false, message: 'Feedback not found' });
        }
        res.status(200).json({ success: true, message: 'Feedback deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};