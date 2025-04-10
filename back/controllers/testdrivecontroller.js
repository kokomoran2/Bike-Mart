const axios = require("axios");
const TestDrive = require("../models/testdrive");
const TestDriveSlot = require("../models/testDriveSlot");
const sendSMS = require("../sms.js");

// 📌 Create a new test drive booking
exports.createTestDrive = async (req, res) => {
  try {
    const { bikeName, showroomDetails, customerName, customerNumber, date } = req.body;

    if (!bikeName || !showroomDetails || !customerName || !customerNumber || !date) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);

    // Find or create slot tracker
    let slotTracker = await TestDriveSlot.findOne({ date: selectedDate });

    if (!slotTracker) {
      slotTracker = new TestDriveSlot({ date: selectedDate, slotsLeft: 9 }); // First booking of the day
    } else {
      if (slotTracker.slotsLeft <= 0) {
        return res.status(400).json({ success: false, message: "All slots are full for this date" });
      }
      slotTracker.slotsLeft -= 1;
    }

    await slotTracker.save();

    const newTestDrive = new TestDrive({
      bikeName,
      showroomDetails,
      customerName,
      customerNumber,
      date: selectedDate,
    });

    await newTestDrive.save();

    // ✅ Call SMS function here
    await sendSMS(customerNumber, customerName, date);

    res.status(201).json({ success: true, message: "Test drive booked successfully", data: newTestDrive });
  } catch (error) {
    console.error("❌ Error booking test drive:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// 📌 Get all test drive bookings
exports.getAllTestDrives = async (req, res) => {
  try {
    const testDrives = await TestDrive.find();
    res.status(200).json({ success: true, data: testDrives });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 📌 Get a single test drive by ID
exports.getTestDriveById = async (req, res) => {
  try {
    const testDrive = await TestDrive.findById(req.params.id);
    if (!testDrive) {
      return res.status(404).json({ success: false, message: "Test drive not found" });
    }
    res.status(200).json({ success: true, data: testDrive });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 📌 Update a test drive booking
exports.updateTestDrive = async (req, res) => {
  try {
    const updatedTestDrive = await TestDrive.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedTestDrive) {
      return res.status(404).json({ success: false, message: "Test drive not found" });
    }
    res.status(200).json({ success: true, message: "Test drive updated successfully", data: updatedTestDrive });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 📌 Delete a test drive booking
exports.deleteTestDrive = async (req, res) => {
  try {
    const testDrive = await TestDrive.findById(req.params.id);
    if (!testDrive) {
      return res.status(404).json({ success: false, message: "Test drive not found" });
    }

    const slotTracker = await TestDriveSlot.findOne({ date: testDrive.date });
    if (slotTracker) {
      slotTracker.slotsLeft += 1;
      await slotTracker.save();
    }

    await testDrive.deleteOne();
    res.status(200).json({ success: true, message: "Test drive deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 📌 Get available slots for a specific date
exports.getAvailableSlots = async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) {
      return res.status(400).json({ success: false, message: "Date is required" });
    }

    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);

    const slotTracker = await TestDriveSlot.findOne({ date: selectedDate });

    res.status(200).json({
      success: true,
      slotsLeft: slotTracker ? slotTracker.slotsLeft : 10, // Default to 10
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
