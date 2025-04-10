import React, { useState, useEffect } from "react";
import axios from "axios";

const ServiceBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/bookservice");
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/bookservice/${id}`);
      alert("Booking deleted successfully!");
      fetchBookings();
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  const handleEdit = (booking) => {
    setEditId(booking._id);
    setEditData({ ...booking });
  };

  const handleEditChanges = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/api/bookservice/${editId}`, editData);
      alert("Booking updated successfully!");
      setEditId(null);
      fetchBookings();
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  const styles = {
    container: {
      margin: "40px auto",
      maxWidth: "900px",
      backgroundColor: "#fff",
      padding: "30px",
      borderRadius: "15px",
      boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
      textAlign: "center",
    },
    title: {
      color: "#007bff",
      fontSize: "32px",
      fontWeight: "bold",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "20px",
    },
    th: {
      backgroundColor: "#007bff",
      color: "white",
      padding: "12px",
      border: "1px solid #ccc",
    },
    td: {
      padding: "12px",
      border: "1px solid #ccc",
      textAlign: "center",
    },
    input: {
      width: "90%",
      padding: "8px",
      borderRadius: "8px",
      border: "2px solid #ccc",
      fontSize: "14px",
      outline: "none",
    },
    button: {
      padding: "10px 20px",
      margin: "5px",
      border: "none",
      borderRadius: "8px",
      fontSize: "14px",
      cursor: "pointer",
    },
    editBtn: {
      backgroundColor: "#ffc107",
      color: "#fff",
    },
    deleteBtn: {
      backgroundColor: "#dc3545",
      color: "#fff",
    },
    saveBtn: {
      backgroundColor: "#28a745",
      color: "#fff",
    },
    cancelBtn: {
      backgroundColor: "#6c757d",
      color: "#fff",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Service Bookings</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Service Center</th>
            <th style={styles.th}>Customer Name</th>
            <th style={styles.th}>Phone</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Bike Name</th>
            <th style={styles.th}>Bike Model</th>
            <th style={styles.th}>Service Requested</th>
            <th style={styles.th}>Service Date</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              {editId === booking._id ? (
                <>
                  <td><input name="serviceCenterName" value={editData.serviceCenterName} onChange={handleEditChanges} style={styles.input} /></td>
                  <td><input name="customerName" value={editData.customerName} onChange={handleEditChanges} style={styles.input} /></td>
                  <td><input name="customerPhone" value={editData.customerPhone} onChange={handleEditChanges} style={styles.input} /></td>
                  <td><input name="customerEmail" value={editData.customerEmail} onChange={handleEditChanges} style={styles.input} /></td>
                  <td><input name="bikeName" value={editData.bikeName} onChange={handleEditChanges} style={styles.input} /></td>
                  <td><input name="bikeModel" value={editData.bikeModel} onChange={handleEditChanges} style={styles.input} /></td>
                  <td><input name="serviceRequested" value={editData.serviceRequested} onChange={handleEditChanges} style={styles.input} /></td>
                  <td><input name="serviceDate" type="date" value={editData.serviceDate} onChange={handleEditChanges} style={styles.input} /></td>
                  <td>
                    <button style={{ ...styles.button, ...styles.saveBtn }} onClick={handleSave}>Save</button>
                    <button style={{ ...styles.button, ...styles.cancelBtn }} onClick={() => setEditId(null)}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td style={styles.td}>{booking.serviceCenterName}</td>
                  <td style={styles.td}>{booking.customerName}</td>
                  <td style={styles.td}>{booking.customerPhone}</td>
                  <td style={styles.td}>{booking.customerEmail}</td>
                  <td style={styles.td}>{booking.bikeName}</td>
                  <td style={styles.td}>{booking.bikeModel}</td>
                  <td style={styles.td}>{booking.serviceRequested}</td>
                  <td style={styles.td}>{booking.serviceDate.substring(0, 10)}</td>
                  <td style={styles.td}>
                    <button style={{ ...styles.button, ...styles.editBtn }} onClick={() => handleEdit(booking)}>Edit</button>
                    <button style={{ ...styles.button, ...styles.deleteBtn }} onClick={() => handleDelete(booking._id)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceBookings;