const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const bikeroutes = require("./Routes/bikeRoutes");
const serviceRoutes = require("./Routes/serviceroutes");
const feedbackroutes = require("./Routes/feedbackroutes");
const customerRoutes = require("./Routes/customerroutes");
const salesRoutes = require("./Routes/salesroutes"); // Uncomment if needed
const BookService = require("./Routes/bookserviceroutes");
const Sold = require("./Routes/soldroutes");
const testDriveRoutes = require("./Routes/testdriveroutes");
// const addressroutes = require("./Routes/addressroutes"); // Uncomment if needed

const app = express();
const port = 5000;

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use("/uploads", express.static("uploads")); // Serve static images

// Connect to Database
connectDB();

// Routes
app.use("/api/bikes", bikeroutes);
app.use("/api/service-centers", serviceRoutes);
app.use("/api/feedback", feedbackroutes);
app.use("/api/customers", customerRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/bookservice", BookService);
app.use("/api/sold", Sold);
app.use("/api/testDrive", testDriveRoutes);
// app.use("/api/user", userroutes); // Uncomment if needed
// app.use("/api/address", addressroutes); // Uncomment if needed

// Start Server
app.listen(port, () => console.log(`Server running on port ${port}`));
