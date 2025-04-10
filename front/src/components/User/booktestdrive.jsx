import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const formStyles = {
  container: {
    maxWidth: "400px",
    margin: "auto",
    padding: "20px",
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgb(255, 255, 255)",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "8px 0",
    color: "black",
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
  lab: {
    width: "100%",
    padding: "10px",
    color: "black",
    fontSize: "16px",
  },
};

const BookTestDrive = () => {
  const navigate = useNavigate();
  const [bikeName, setBikeName] = useState("");
  const [showroomDetails, setShowroomDetails] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerNumber, setCustomerNumber] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedBikeName = localStorage.getItem("bikeName");
    const storedShowroomName = localStorage.getItem("showroomName");
    const storedShowroomLocation = localStorage.getItem("showroomLocation");

    if (storedBikeName) setBikeName(storedBikeName);
    if (storedShowroomName && storedShowroomLocation) {
      setShowroomDetails(`${storedShowroomName} - ${storedShowroomLocation}`);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    if (!bikeName || !showroomDetails || !customerName || !customerNumber || !date) {
      setMessage("Please fill in all fields.");
      setIsLoading(false);
      return;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(customerNumber)) {
      setMessage("Please enter a valid 10-digit phone number.");
      setIsLoading(false);
      return;
    }

    const bookingData = {
      bikeName,
      showroomDetails,
      customerName,
      customerNumber,
      date,
    };

    try {
      const response = await axios.post("http://localhost:5000/api/testDrive/add", bookingData);
      if (response.data.success) {
        setMessage("Test drive booked successfully!");
        setCustomerName("");
        setCustomerNumber("");
        setDate("");
        localStorage.removeItem("bikeName");
        localStorage.removeItem("showroomName");
        localStorage.removeItem("showroomLocation");
        setTimeout(() => navigate(-2), 1500); // small delay so success msg shows
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={formStyles.container}>
      <h2>Book a Test Drive</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={bikeName} disabled style={formStyles.input} />
        <input type="text" value={showroomDetails} disabled style={formStyles.input} />

        <label htmlFor="customerName" style={formStyles.lab}>Customer Name</label>
        <input
          type="text"
          id="customerName"
          style={formStyles.input}
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
        />

        <label htmlFor="customerNumber" style={formStyles.lab}>Customer Phone Number</label>
        <input
          type="text"
          id="customerNumber"
          style={formStyles.input}
          value={customerNumber}
          onChange={(e) => setCustomerNumber(e.target.value)}
          pattern="\d{10}"
          required
          maxLength="10"
        />

        <label htmlFor="date" style={formStyles.lab}>Date</label>
        <input
          type="date"
          id="date"
          style={formStyles.input}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <button type="submit" style={formStyles.button} disabled={isLoading}>
          {isLoading ? "Booking..." : "Book Test Drive"}
        </button>
      </form>

      {message && <p className="mt-3">{message}</p>}
    </div>
  );
};

export default BookTestDrive;
