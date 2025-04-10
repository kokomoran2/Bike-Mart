const mongoose = require("mongoose");

const testDriveSlotSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    unique: true,
  },
  slotsLeft: {
    type: Number,
    default: 10,
  },
});

const TestDriveSlot = mongoose.model("TestDriveSlot", testDriveSlotSchema);
module.exports = TestDriveSlot;
