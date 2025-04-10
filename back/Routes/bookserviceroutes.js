const express = require("express");
const {
  createBooking,
  getAllBookings,
  getBookingById,
  updateAllBookings,
  updateBookingById,
  deleteAllBookings,
  deleteBookingById
} = require("../controllers/bookservicecontroller");

const router = express.Router();

router.post("/", createBooking);             // Create Booking
router.get("/", getAllBookings);              // Get All Bookings
router.get("/:id", getBookingById);           // Get Booking by ID
router.put("/", updateAllBookings);           // Update All Bookings
router.put("/:id", updateBookingById);        // Update Booking by ID
router.delete("/", deleteAllBookings);        // Delete All Bookings
router.delete("/:id", deleteBookingById);     // Delete Booking by ID

module.exports = router;
