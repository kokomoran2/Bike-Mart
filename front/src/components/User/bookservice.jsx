import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BookService = () => {
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [bikeName, setBikeName] = useState("");
  const [bikeModel, setBikeModel] = useState("");
  const [serviceRequested, setServiceRequested] = useState("");
  const [serviceDate, setServiceDate] = useState("");
  const [serviceCenterName, setServiceCenterName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedServiceCenter = localStorage.getItem("serviceCenterName");
    if (storedServiceCenter) {
      setServiceCenterName(storedServiceCenter);
    }
  }, []);

  const validateForm = () => {
    const phoneRegex = /^[0-9]{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!customerName.trim()) return alert("Please enter your name.");
    if (!phoneRegex.test(customerPhone)) return alert("Please enter a valid 10-digit phone number.");
    if (!emailRegex.test(customerEmail)) return alert("Please enter a valid email address.");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const bookingData = {
      serviceCenterName,
      customerName,
      customerPhone,
      customerEmail,
      bikeName,
      bikeModel,
      serviceRequested,
      serviceDate,
    };

    try {
      const response = await axios.post("http://localhost:5000/api/bookservice", bookingData);
      alert(response.data.message);
      navigate('/user');
    } catch (error) {
      console.error("Error booking service:", error);
      alert(error.response?.data?.error || "Failed to book service.");
    }
  };

  const formStyles = {
    container: {
      maxWidth: "400px",
      margin: "auto",
      padding: "20px",
      background: "#fff",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    },
    input: {
      width: "100%",
      padding: "10px",
      margin: "8px 0",
      borderRadius: "6px",
      border: "1px solid #ccc",
      fontSize: "14px",
    },
    button: {
      width: "100%",
      padding: "10px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "6px",
      fontSize: "16px",
      cursor: "pointer",
      marginTop: "10px",
    },
  };

  return (
    <div style={formStyles.container}>
      <h2 style={{ textAlign: "center", color: "#007bff" }}>Book a Service</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={serviceCenterName} disabled style={formStyles.input} />
        <input type="text" placeholder="Customer Name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} style={formStyles.input} required />
        <input type="tel" placeholder="Phone Number" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} style={formStyles.input} required />
        <input type="email" placeholder="Email" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} style={formStyles.input} required />
        <input type="text" placeholder="Bike Name" value={bikeName} onChange={(e) => setBikeName(e.target.value)} style={formStyles.input} required />
        <input type="text" placeholder="Bike Model" value={bikeModel} onChange={(e) => setBikeModel(e.target.value)} style={formStyles.input} required />
        <input type="text" placeholder="Service Requested" value={serviceRequested} onChange={(e) => setServiceRequested(e.target.value)} style={formStyles.input} required />
        <input type="date" value={serviceDate} onChange={(e) => setServiceDate(e.target.value)} style={formStyles.input} required />
        <button type="submit" style={formStyles.button}>Book Service</button>
      </form>
    </div>
  );
};

export default BookService;
