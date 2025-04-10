import React, { useState, useEffect } from "react";
import axios from "axios";

const formStyles = {
  container: {
    maxWidth: "1000px",
    margin: "auto",
    padding: "20px",
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgb(255, 255, 255)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "20px",
  },
  th: {
    padding: "10px",
    backgroundColor: "#007bff",
    color: "white",
    fontSize: "16px",
  },
  td: {
    padding: "10px",
    borderBottom: "1px solid #ccc",
    fontSize: "14px",
  },
  button: {
    padding: "6px 12px",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    marginRight: "5px",
  },
  editButton: {
    padding: "6px 12px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "24px",
    color: "#333",
  },
  input: {
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    width: "120px",
  },
};

const ViewTestDrive = () => {
  const [testDrives, setTestDrives] = useState([]);
  const [message, setMessage] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [selectedTestDrive, setSelectedTestDrive] = useState(null);
  const [updatedDate, setUpdatedDate] = useState("");
  
  // Fetch all test drives for the admin
  useEffect(() => {
    const fetchTestDrives = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/testDrive");
        setTestDrives(response.data.data);
      } catch (error) {
        setMessage("Error fetching test drives.");
      }
    };

    fetchTestDrives();
  }, []);

  // Handle deletion of a test drive booking
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this booking?");
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`http://localhost:5000/api/testDrive/${id}`);
      if (response.data.success) {
        setTestDrives(testDrives.filter((drive) => drive._id !== id)); // Remove deleted booking from the state
        setMessage("Test drive booking deleted successfully.");
      }
    } catch (error) {
      setMessage("Error deleting test drive booking.");
    }
  };

  // Enable edit mode for a test drive
  const handleEdit = (testDrive) => {
    setEditMode(true);
    setSelectedTestDrive(testDrive);
    setUpdatedDate(testDrive.date); // Set the initial date to be editable
  };

  // Handle saving the edited test drive
  const handleSaveEdit = async () => {
    try {
      const updatedTestDrive = { ...selectedTestDrive, date: updatedDate };
      const response = await axios.put(
        `http://localhost:5000/api/testDrive/${selectedTestDrive._id}`,
        updatedTestDrive
      );
      if (response.data.success) {
        const updatedTestDrives = testDrives.map((drive) =>
          drive._id === selectedTestDrive._id ? updatedTestDrive : drive
        );
        setTestDrives(updatedTestDrives);
        setEditMode(false);
        setMessage("Test drive updated successfully.");
      }
    } catch (error) {
      setMessage("Error saving changes.");
    }
  };

  return (
    <div style={formStyles.container}>
      <h2 style={formStyles.heading}>Manage Test Drive Bookings</h2>
      {message && <p>{message}</p>}

      <table style={formStyles.table}>
        <thead>
          <tr>
            <th style={formStyles.th}>Bike Name</th>
            <th style={formStyles.th}>Showroom</th>
            <th style={formStyles.th}>Customer Name</th>
            <th style={formStyles.th}>Customer Number</th>
            <th style={formStyles.th}>Date</th>
            <th style={formStyles.th}>Available Slots</th>
            <th style={formStyles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {testDrives.length > 0 ? (
            testDrives.map((drive) => {
              // Calculate the available slots based on the current test drive date
              const bookedSlots = testDrives.filter(
                (testDrive) => new Date(testDrive.date).toDateString() === new Date(drive.date).toDateString()
              ).length;
              const availableSlots = 10 - bookedSlots; // Assuming max 10 slots per day

              return (
                <tr key={drive._id}>
                  <td style={formStyles.td}>{drive.bikeName}</td>
                  <td style={formStyles.td}>{drive.showroomName}</td>
                  <td style={formStyles.td}>{drive.customerName}</td>
                  <td style={formStyles.td}>{drive.customerNumber}</td>
                  <td style={formStyles.td}>
                    {editMode && selectedTestDrive._id === drive._id ? (
                      <input
                        type="date"
                        value={updatedDate}
                        onChange={(e) => setUpdatedDate(e.target.value)}
                        style={formStyles.input}
                      />
                    ) : (
                      new Date(drive.date).toLocaleDateString()
                    )}
                  </td>
                  <td style={formStyles.td}>{availableSlots} Slots Left</td>
                  <td style={formStyles.td}>
                    {editMode && selectedTestDrive._id === drive._id ? (
                      <>
                        <button onClick={handleSaveEdit} style={formStyles.editButton}>
                          Save
                        </button>
                        <button onClick={() => setEditMode(false)} style={formStyles.button}>
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleEdit(drive)} style={formStyles.editButton}>
                          Edit
                        </button>
                        <button onClick={() => handleDelete(drive._id)} style={formStyles.button}>
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="7" style={formStyles.td}>
                No test drives booked yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewTestDrive;
