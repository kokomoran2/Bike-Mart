const express = require("express");
const multer = require("multer");
const path = require("path");
const { createBike, getAllBikes, updateBike, deleteBike, getBikeById } = require("../controllers/addbikecontroller");

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// API Routes
router.post("/add", upload.single("bikeImage"), createBike);
router.get("/all", getAllBikes);
router.get("/get/:id", getBikeById);
router.put("/update/:id", upload.single("bikeImage"), updateBike);
router.delete("/delete/:id", deleteBike);

module.exports = router;
