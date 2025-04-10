import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useBike } from '../User/Bikecontext';
import jsPDF from 'jspdf';

const Address = () => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const [userId, setUserId] = useState(null);
  const [customerName, setCustomerName] = useState(""); // Store customer name
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { selectedBike, fetchBikes } = useBike();
  const customerId = localStorage.getItem("customerId"); // Fetch customerId from localStorage

  useEffect(() => {
    const fetchUserAddress = async () => {
      if (!customerId) {
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(`http://localhost:5000/api/customers/get/${customerId}`);
        const customerData = response.data;

        if (customerData && customerData._id) {
          setAddresses(customerData.address || []);
          setUserId(customerData._id);
          setCustomerName(customerData.name); // Store name
        } else {
          console.error("Invalid user data received:", customerData);
        }
      } catch (error) {
        console.error('Error fetching user address:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserAddress();
  }, [customerId]);

  // Handle Address Input Change
  const handleAddressChange = (index, field, value) => {
    setAddresses((prev) =>
      prev.map((addr, i) => (i === index ? { ...addr, [field]: value } : addr))
    );
  };

  const handleUpdateAddress = async () => {
    if (!userId) return alert("User not found!");

    try {
      await axios.put(`http://localhost:5000/api/customers/${userId}`, { address: addresses });
      alert('Address updated successfully!');
    } catch (error) {
      console.error('Error updating address:', error);
      alert("Failed to update address.");
    }
  };

  const handleConfirmPurchase = async () => {
    if (!addresses[selectedAddressIndex]) {
        alert("Please select an address before proceeding.");
        return;
    }

    if (!selectedBike || selectedBike.Stock <= 0) {
        alert("Bike is out of stock.");
        return;
    }

    if (!userId) {
        alert("User information is missing. Please try again.");
        return;
    }

    const selectedAddress = addresses[selectedAddressIndex];

    console.log("Selected Address:", selectedAddress);  // ✅ Debugging log
    console.log("Selected District:", selectedAddress?.district || "Unknown");

    if (!selectedAddress?.district) {
        alert("Please enter a valid district.");
        return;
    }

    if (window.confirm("Do you want to proceed with this address?")) {
        try {
            const saleData = {
                bikeId: selectedBike._id,
                customerId: userId,
                district: selectedAddress?.district || "Unknown",  // ✅ Ensure district is always sent
                address: `${selectedAddress.location}, ${selectedAddress.pincode}, ${selectedAddress.landmark}`,  // ✅ Address formatting
            };

            console.log("Sending sale data:", saleData);
            const response = await axios.post("http://localhost:5000/api/sales/add", saleData);
            if (response.status === 201) {
                alert("Bike purchased successfully!");

                // Update bike stock safely
                const updatedStock = Math.max(0, selectedBike.Stock - 1);
                await axios.put(`http://localhost:5000/api/bikes/update/${selectedBike._id}`, { Stock: updatedStock });

                generatePDF();
                navigate(-2);
                fetchBikes();
            } else {
                throw new Error("Unexpected response status: " + response.status);
            }
        } catch (error) {
            console.error("Purchase failed:", error);
            alert("An unexpected error occurred while processing your purchase.");
        }
    }
};

  const generatePDF = () => {
    const doc = new jsPDF();
    const selectedAddress = addresses[selectedAddressIndex];

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Bike Purchase Invoice", 70, 20);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Customer Name: ${customerName || "N/A"}`, 20, 35); // Added customer name
    doc.text(`Customer ID: ${userId || "N/A"}`, 20, 45);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 140, 45);

    doc.setFont("helvetica", "bold");
    doc.text("Bike Details:", 20, 60);
    doc.setFont("helvetica", "normal");
    doc.text(`Bike Name: ${selectedBike?.name || "N/A"}`, 20, 70);
    doc.text(`Bike Price: ₹${selectedBike?.price || "N/A"}`, 20, 80);

    doc.setFont("helvetica", "bold");
    doc.text("Shipping Address:", 20, 95);
    doc.setFont("helvetica", "normal");
    doc.text(`${selectedAddress?.location || "N/A"}`, 20, 105);
    doc.text(`${selectedAddress?.pincode || "N/A"}`, 20, 115);
    doc.text(`${selectedAddress?.landmark || "N/A"}`, 20, 125);
    doc.text(`${selectedAddress?.district || "N/A"}`, 20, 135);

    doc.setFont("helvetica", "bold");
    doc.text("Authorized Signature", 140, 150);
    doc.line(130, 155, 190, 155);
    doc.save("purchase_invoice.pdf");
  };

  if (loading) {
    return <h2 style={{ color: 'white', textAlign: 'center' }}>Loading address...</h2>;
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg,rgb(5, 12, 82), #1e1e1e,rgb(11, 4, 64))', padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
      <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '20px', borderRadius: '15px', maxWidth: '400px', textAlign: 'center' }}>
        <h2>Confirm Your Address</h2>
        {addresses.length > 0 ? (
          <div>
            <select value={selectedAddressIndex} onChange={(e) => setSelectedAddressIndex(Number(e.target.value))} style={{ width: '100%', padding: '10px', borderRadius: '8px', marginBottom: '10px' }}>
              {addresses.map((addr, index) => (
                <option key={index} value={index}>{addr.location}, {addr.pincode}, {addr.landmark}</option>
              ))}
            </select>
            <div style={{ textAlign: 'left' }}>
              <label>Location:</label>
              <input
                type="text"
                value={addresses[selectedAddressIndex]?.location || ''}
                onChange={(e) => handleAddressChange(selectedAddressIndex, 'location', e.target.value)}
                style={{ width: '100%', padding: '5px', marginBottom: '5px', borderRadius: '5px' }}
              />
              <label>Pincode:</label>
              <input
                type="text"
                value={addresses[selectedAddressIndex]?.pincode || ''}
                onChange={(e) => handleAddressChange(selectedAddressIndex, 'pincode', e.target.value)}
                style={{ width: '100%', padding: '5px', marginBottom: '5px', borderRadius: '5px' }}
              />
              <label>Landmark:</label>
              <input
                type="text"
                value={addresses[selectedAddressIndex]?.landmark || ''}
                onChange={(e) => handleAddressChange(selectedAddressIndex, 'landmark', e.target.value)}
                style={{ width: '100%', padding: '5px', marginBottom: '10px', borderRadius: '5px' }}
              />
              <label>District:</label>
              <input
                type="text"
                value={addresses[selectedAddressIndex]?.district || ''}
                onChange={(e) => handleAddressChange(selectedAddressIndex, 'district', e.target.value)}
                style={{ width: '100%', padding: '5px', marginBottom: '10px', borderRadius: '5px' }}
              />
            </div>
          </div>
        ) : (
          <p>No address found. Please add one.</p>
        )}
        <button onClick={handleUpdateAddress}>Update Address</button>
        <button onClick={handleConfirmPurchase} disabled={addresses.length === 0}>Confirm & Buy</button>
      </div>
    </div>
  );
};

export default Address;
