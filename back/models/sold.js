const mongoose = require('mongoose');

const SoldSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true
  },
  bikeName: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  district: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    default: 'Sold'
  }
});

const Sold = mongoose.model('Sold', SoldSchema);

module.exports = Sold;
