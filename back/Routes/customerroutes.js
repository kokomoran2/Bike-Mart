const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customercontroller");
console.log(customerController); // Check if it's undefined
console.log(customerController.getAllCustomers); // Should be a function


// Customer CRUD Routes
router.get("/get", customerController.getAllCustomers); // Get all customers
router.post("/login", customerController.loginCustomer); // Get all customers
router.get("/get/:id", customerController.getCustomerById); // Get a customer by ID
router.post("/create", customerController.createCustomer); // Create a new customer
router.put("/:id", customerController.updateCustomer); // Update a customer
router.delete("/:id", customerController.deleteCustomer); // Delete a customer
router.get("/with-orders", customerController.getCustomersWithOrders);

// Address Routes for a Customer
router.get("/:id/addresses", customerController.getCustomerAddresses); // Get all addresses
// router.get("/:id/address", customerController.getCustomerAddressesbyid); // ✅ Correct function name
router.post("/:id/addresses", customerController.addAddress); // Add an address to a customer
router.delete("/:id/addresses/:addressId", customerController.deleteAddress);
 // Delete an address

module.exports = router;
