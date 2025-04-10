const BookService = require("../models/bookservicemodel");
require("dotenv").config({ path: "1.env" });
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  
  // Create a new Service Booking and Send Email
  const createBooking = async (req, res) => {
    try {
      const newBooking = new BookService(req.body);
      await newBooking.save();
  
      // Extract Booking Details
      const { serviceCenterName, customerName, customerEmail, serviceDate, bikeName } = newBooking;
      const serviceTime = Math.floor(Math.random() * (17 - 9 + 1)) + 9; // Random time between 9 AM to 5 PM
  
      // Email Details
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: customerEmail,
        subject: "Service Booking Confirmation",
        html: `<h2>Service Booking Confirmed</h2>
               <p>Dear ${customerName},</p>
               <p>Your service booking is confirmed at <strong>${serviceCenterName}</strong>.</p>
               <p><strong>Service Date:</strong> ${new Date(serviceDate).toDateString()}</p>
               <p><strong>Service Time:</strong> ${serviceTime}:00</p>
               <p><strong>Bike Name:</strong> ${bikeName}</p>
               <p>Thank you for choosing our service center. We look forward to serving you!</p>
               <p>Best Regards,<br/>Service Center Team</p>`,
      };
  
      // Send Email
      await transporter.sendMail(mailOptions);
  
      res.status(201).json({ message: "Service booked successfully. Confirmation email sent.", booking: newBooking });
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).json({ error: error.message });
    }
  };
// Get all Service Bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await BookService.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a Service Booking by ID
const getBookingById = async (req, res) => {
  try {
    const booking = await BookService.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update All Bookings (Use with caution)
const updateAllBookings = async (req, res) => {
  try {
    const updated = await BookService.updateMany({}, req.body);
    res.status(200).json({ message: "All bookings updated successfully", updated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Booking by ID
const updateBookingById = async (req, res) => {
  try {
    const updatedBooking = await BookService.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBooking) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json({ message: "Booking updated successfully", booking: updatedBooking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete All Bookings
const deleteAllBookings = async (req, res) => {
  try {
    await BookService.deleteMany({});
    res.status(200).json({ message: "All bookings deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Booking by ID
const deleteBookingById = async (req, res) => {
  try {
    const deletedBooking = await BookService.findByIdAndDelete(req.params.id);
    if (!deletedBooking) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json({ message: "Booking deleted successfully", booking: deletedBooking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  updateAllBookings,
  updateBookingById,
  deleteAllBookings,
  deleteBookingById
};
