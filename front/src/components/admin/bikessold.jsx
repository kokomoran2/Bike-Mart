import React, { useEffect, useState } from "react";
import axios from "axios";

const BikeSold = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/sold");
      setSales(response.data);
    } catch (error) {
      console.error("Error fetching sold bikes data:", error);
      setError("Failed to fetch sold bikes data.");
    } finally {
      setLoading(false);
    }
  };

  const deleteSale = async (saleId) => {
    if (window.confirm("Are you sure you want to delete this sold bike?")) {
      try {
        await axios.delete(`http://localhost:5000/api/sold/${saleId}`);
        setSales((prevSales) => prevSales.filter((sale) => sale._id !== saleId));
        alert("Sold bike deleted successfully!");
      } catch (error) {
        console.error("Error deleting sold bike:", error);
        alert("Failed to delete sold bike.");
      }
    }
  };

  if (loading) return <p>Loading sold bikes data...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ maxWidth: "1200px", margin: "auto", padding: "20px" }}>
      <h2>Sold Bikes</h2>
      {sales.length === 0 ? (
        <p>No sold bikes found.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Bike Name</th>
              <th>Price</th>
              <th>District</th>
              <th>Address</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale._id}>
                <td>{sale.customerName}</td>
                <td>{sale.bikeName}</td>
                <td>₹{sale.price.toLocaleString()}</td>
                <td>{sale.district}</td>
                <td>{sale.address}</td>
                <td>{new Date(sale.date).toLocaleDateString()}</td>
                <td>
                  <button
                    onClick={() => deleteSale(sale._id)}
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      padding: "5px 10px",
                      borderRadius: "5px",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BikeSold;
