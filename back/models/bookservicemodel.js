const mongoose = require("mongoose");

const bookServiceSchema = new mongoose.Schema({
  serviceCenterName: {
    type: String,
    required: true,
    default: () => localStorage.getItem('serviceCenterName') || 'Unknown' // Fetched from localStorage
  },
  customerName: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^[a-zA-Z ]+$/.test(v);
      },
      message: props => `${props.value} is not a valid name! Only letters and spaces are allowed.`
    }
  },
  customerPhone: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^[0-9]{10}$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number! Must be 10 digits.`
    }
  },
  customerEmail: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    }
  },
  bikeName: {
    type: String,
    required: true
  },
  bikeModel: {
    type: String,
    required: true
  },
  serviceRequested: {
    type: String,
    required: true
  },
  serviceDate: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const BookService = mongoose.model("BookService", bookServiceSchema);

module.exports = BookService;
