const express = require("express");
const router = express.Router();
const testDriveController = require("../controllers/testdrivecontroller");
const TestDrive = require('../models/testdrive');

// Define routes
router.get('/slots', async (req, res) => {
    try {
      const { date } = req.query;
      const normalizedDate = new Date(date).setHours(0, 0, 0, 0);
  
      const count = await TestDrive.countDocuments({ date: normalizedDate });
      const slotsLeft = Math.max(10 - count, 0);
  
      res.json({ slotsLeft });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
router.post("/add", testDriveController.createTestDrive);
router.get("/", testDriveController.getAllTestDrives);
router.get("/:id", testDriveController.getTestDriveById);
router.put("/:id", testDriveController.updateTestDrive);
router.delete("/:id", testDriveController.deleteTestDrive);

module.exports = router;
