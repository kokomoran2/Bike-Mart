const express = require("express");
const router = express.Router();
const feedbackcontroller = require("../controllers/feedbackcontroller");

router.post('/createfeedback', feedbackcontroller.createFeedback);
router.get("/get", feedbackcontroller.getAllFeedback);
router.get("/:id", feedbackcontroller.getFeedbackById);  // Fixed typo
router.delete("/:id", feedbackcontroller.deleteFeedback); // Fixed typo

module.exports = router;