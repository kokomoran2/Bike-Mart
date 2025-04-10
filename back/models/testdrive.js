const mongoose = require("mongoose");

const testDriveSchema = new mongoose.Schema({
  bikeName: {
    type: String,
    required: true,
  },
  showroomDetails: {
    type: String,
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  customerNumber: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /^\d{10}$/.test(v),
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  date: {
    type: Date,
    required: true,
  },
  slotsLeft: {
    type: Number,
    default: 10,
  },
});

const TestDrive = mongoose.model("TestDrive", testDriveSchema);
module.exports = TestDrive;
