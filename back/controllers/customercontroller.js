const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const Customer = require("../models/customermodel");
require("dotenv").config();

const districtsOfKerala = [
  "Thiruvananthapuram", "Kollam", "Pathanamthitta", "Alappuzha", "Kottayam", 
  "Idukki", "Ernakulam", "Thrissur", "Palakkad", "Malappuram", 
  "Kozhikode", "Wayanad", "Kannur", "Kasaragod"
];

// Create a new customer
const createCustomer = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, Email, and Password are required!" });
    }

    // Check if customer already exists
    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return res.status(400).json({ message: "Customer already exists!" });
    }

    // ✅ Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Validate and format addresses
    const formattedAddress = Array.isArray(address)
      ? address.map(addr => {
          if (!districtsOfKerala.includes(addr.district)) {
            throw new Error(`Invalid district: ${addr.district}. Choose from ${districtsOfKerala.join(", ")}`);
          }
          return addr;
        })
      : [];

    // Create new customer
    const newCustomer = new Customer({
      name,
      email,
      password: password, // ✅ Save hashed password
      phone,
      address: formattedAddress
    });

    await newCustomer.save();

    res.status(201).json({ message: "Customer registered successfully!", data: newCustomer });

  } catch (error) {
    console.error("Error creating customer:", error);
    res.status(500).json({ message: "Error creating customer", error: error.message });
  }
};

// Login customer and return JWT token
const loginCustomer = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find customer by email
    const customer = await Customer.findOne({ email });
    if (!customer) return res.status(400).json({ message: "Invalid email or password!" });

    // Compare hashed passwords
    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password!" });

    // Generate JWT Token
    const token = jwt.sign({ id: customer._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful!", token, customer });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all customers
const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching customers", error });
  }
};

// Get customer by ID
const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: "Error fetching customer", error });
  }
};

// Update customer by ID
const updateCustomer = async (req, res) => {
  try {
    const updatedData = {};
    if (req.body.name) updatedData.name = req.body.name;
    if (req.body.email) updatedData.email = req.body.email;

    const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!updatedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json({ message: "Customer updated successfully", updatedCustomer });
  } catch (error) {
    res.status(500).json({ message: "Error updating customer", error });
  }
};

// Delete customer by ID
const deleteCustomer = async (req, res) => {
  try {
    const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
    if (!deletedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting customer", error });
  }
};

// Get addresses of a customer by ID
const getCustomerAddresses = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json(customer.address);
  } catch (error) {
    res.status(500).json({ message: "Error fetching addresses", error });
  }
};

// Add an address to a customer
const addAddress = async (req, res) => {
  try {
    const { location, pincode, landmark, district } = req.body;
    if (!districtsOfKerala.includes(district)) {
      return res.status(400).json({ message: `Invalid district: ${district}. Choose from ${districtsOfKerala.join(", ")}` });
    }

    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    customer.address.push({ location, pincode, landmark, district });
    await customer.save();
    res.status(200).json({ message: "Address added successfully", customer });
  } catch (error) {
    res.status(500).json({ message: "Error adding address", error });
  }
};

// Delete an address from a customer
const deleteAddress = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    customer.address = customer.address.filter((addr) => addr._id.toString() !== req.params.addressId);
    await customer.save();
    res.status(200).json({ message: "Address deleted successfully", customer });
  } catch (error) {
    res.status(500).json({ message: "Error deleting address", error });
  }
};
// Get customers who have made at least one purchase
const getCustomersWithOrders = async (req, res) => {
  try {
      const customers = await Sales.distinct("customer.id");
      if (customers.length === 0) {
          return res.status(404).json({ message: "No customers with orders found" });
      }

      const customerData = await Customer.find({ _id: { $in: customers } }).select("name email phone");
      res.status(200).json(customerData);
  } catch (error) {
      console.error("Error fetching customers with orders:", error.message);
      res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = {
  loginCustomer,
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomerAddresses,
  addAddress,
  deleteAddress,
  getCustomersWithOrders,
};
